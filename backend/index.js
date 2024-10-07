const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connection');
const userRoutes = require('./routes/user');
const tripRoutes = require('./routes/tripRoutes'); 
const app = express();
const PORT = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors());
app.use(express.json());

connectDB(process.env.MONGODB_URI);

app.use('/api/users', userRoutes);
app.use('/api/trips', tripRoutes); 

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
