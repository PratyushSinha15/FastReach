import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';

const mongoURI = 'mongodb+srv://dkprashant04:D09J5H1X2t3lzHCi@routes.ghirp.mongodb.net/';
const server = express()
server.use(cors());

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Atlas connected successfully'))
.catch(err => console.log('MongoDB connection error: ', err));

class Node {
    constructor(currLocation, destination, cabCost, trainCost, flightCost, cabTime, trainTime, flightTime) {
        this.currLocation = currLocation;
        this.destination = destination;
        this.cabCost = cabCost;
        this.trainCost = trainCost;
        this.flightCost = flightCost;
        this.cabTime = cabTime;
        this.trainTime = trainTime;
        this.flightTime = flightTime;
    }

    getMinCost() {
        return Math.min(this.flightCost, Math.min(this.cabCost, this.trainCost));
    }
}

class Pair {
    constructor(source, cost) {
        this.source = source;
        this.cost = cost;
    }
}

class MinHeap {
    constructor() {
        this.heap = [];
    }

    push(pair) {
        this.heap.push(pair);
        this.bubbleUp();
    }

    pop() {
        if (this.heap.length === 1) return this.heap.pop();
        const root = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();
        return root;
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        const element = this.heap[index];
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            const parent = this.heap[parentIndex];
            if (element.cost >= parent.cost) break;
            this.heap[parentIndex] = element;
            this.heap[index] = parent;
            index = parentIndex;
        }
    }

    bubbleDown() {
        let index = 0;
        const length = this.heap.length;
        const element = this.heap[0];
        while (true) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let swap = null;
            if (leftChildIndex < length) {
                const leftChild = this.heap[leftChildIndex];
                if (leftChild.cost < element.cost) swap = leftChildIndex;
            }
            if (rightChildIndex < length) {
                const rightChild = this.heap[rightChildIndex];
                if (
                    (swap === null && rightChild.cost < element.cost) ||
                    (swap !== null && rightChild.cost < this.heap[swap].cost)
                ) {
                    swap = rightChildIndex;
                }
            }
            if (swap === null) break;
            this.heap[index] = this.heap[swap];
            this.heap[swap] = element;
            index = swap;
        }
    }
}

function dijkstra(map, source, destination) {
    const dist = new Map();
    dist.set(source, 0);

    const track = new Map();
    const priorityQueue = new MinHeap();
    priorityQueue.push(new Pair(source, 0));

    const vis = new Set();

    while (priorityQueue.heap.length > 0) {
        const u = priorityQueue.pop();

        if (!vis.has(u.source)) {
            vis.add(u.source);
            const list = map.get(u.source) || [];
            let s = "";

            for (const n of list) {
                if (!vis.has(n.destination)) {
                    if (!dist.has(n.destination)) dist.set(n.destination, Infinity);

                    const minCost = n.getMinCost();
                    const newDist = dist.get(u.source) + minCost;

                    if (newDist < dist.get(n.destination)) {
                        s += `${u.source} to ${n.destination} with ${getTransport(minCost, n)},`;
                        dist.set(n.destination, newDist);
                        priorityQueue.push(new Pair(n.destination, newDist));
                        track.set(n.destination, (track.get(n.currLocation) || "") + " " + s);
                        s = "";
                    }
                }
            }
        }
    }

    const finalDistance = dist.get(destination) || Infinity;
    return `${track.get(destination) || ""} Total cost: $ ${finalDistance}`;
}

function getTransport(minCost, node) {
    if (minCost === node.flightCost) return "flight";
    if (minCost === node.cabCost) return "cab";
    return "train";
}

const routeSchema = new mongoose.Schema({
    source: String,
    destination: String,
    flight: Number,
    train: Number,
    car: Number
});

const Route = mongoose.model('Route', routeSchema);

server.get('/routes', async (req, res) => {
    console.log("clicked");
    const { source, destination } = req.query;
    if (!source || !destination) {
        return res.status(400).send('Source and destination are required.');
    }

    try {
        const allRoutes = await Route.find({});
        const routeMap = new Map();

        // Map the retrieved routes to Node instances
        allRoutes.forEach(route => {
            const node = new Node(route.source, route.destination, route.car, route.train, route.flight);
            if (!routeMap.has(route.source)) {
                routeMap.set(route.source, []);
            }
            routeMap.get(route.source).push(node);
        });
        console.log(routeMap)
        // Run Dijkstra algorithm with source and destination
        const result = dijkstra(routeMap, source, destination);
        res.type('text/plain').send(result);
    } catch (error) {
        res.status(500).send("Error retrieving routes: " + error.message);
    }
});


server.listen(5000,()=>{

    // const routes = [
    //     { source: "Sindri", destination: "Jharkhand", flight: 234, train: 34, car: 10 },
    //     { source: "Jharkhand", destination: "Ranchi", flight: 150, train: 20, car: -1 },
    //     { source: "Ranchi", destination: "Bokaro", flight: 120, train: 15, car: 5 },
    //     { source: "Bokaro", destination: "Dhanbad", flight: 100, train: 10, car: 8 },
    //     { source: "Dhanbad", destination: "Jamshedpur", flight: 180, train: 25, car: 12 },
    //     { source: "Jamshedpur", destination: "Kolkata", flight: 300, train: 50, car: 15 },
    //     { source: "Kolkata", destination: "Howrah", flight: 50, train: 5, car: 3 },
    //     { source: "Howrah", destination: "Bhubaneswar", flight: 200, train: 30, car: -1 },
    //     { source: "Bhubaneswar", destination: "Cuttack", flight: 80, train: 10, car: 4 },
    //     { source: "Cuttack", destination: "Puri", flight: 90, train: 12, car: 6 }
    // ];

    console.log("server is working");
    // try {
    //     const result =  Route.insertMany(routes);
    //     console.log("Inserted ${result.length} routes successfully.")
    // } catch (error) {
    //     console.log(error)
    // }
});
