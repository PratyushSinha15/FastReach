import React, { useState } from 'react';
import { Button } from '@/components/ui/button'; // Adjust import path based on your setup
import { Input } from '@/components/ui/input'; // Adjust import path based on your setup
import { Zap, Clock, Map, Plane, Search, Menu, X, Bot } from 'lucide-react';
import { Link } from 'react-router-dom'; // Use react-router-dom for navigation
import placeholderImage from '../assets/img.jpg'; // Adjust path to your placeholder image

export default function FastReachLanding() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed h-screen inset-y-0 left-0 z-50 w-64 bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:sticky lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-700">
          <Link to="#" className="flex items-center justify-center">
            <Zap className="h-6 w-6 text-blue-400" />
            <span className="ml-2 text-xl font-bold text-white">Fast Reach</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="lg:hidden text-white hover:text-blue-400">
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="px-4 pt-6">
          <ul className="space-y-4">
            <li>
              <Link className="flex items-center text-gray-300 hover:text-blue-400 transition-colors" to="/quick-routes">
                <Clock className="h-5 w-5 mr-2" />
                Quick Routes
              </Link>
            </li>
            <li>
              <Link className="flex items-center text-gray-300 hover:text-blue-400 transition-colors" to="#">
                <Map className="h-5 w-5 mr-2" />
                Efficiency Tips
              </Link>
            </li>
            <li>
              <Link className="flex items-center text-gray-300 hover:text-blue-400 transition-colors" to="/trip-planner">
                <Bot className="h-5 w-5 mr-2" />
                AI Trip Planner
              </Link>
            </li>
            <li>
              <Link className="flex items-center text-gray-300 hover:text-blue-400 transition-colors" to="#">
                <Plane className="h-5 w-5 mr-2" />
                About Us
              </Link>
            </li>
            <li>
              <Link className="flex items-center text-gray-300 hover:text-blue-400 transition-colors" to="#">
                <Zap className="h-5 w-5 mr-2" />
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 flex items-center justify-between px-6 bg-gray-800 shadow-sm lg:hidden">
          <Link to="#" className="flex items-center justify-center">
            <Zap className="h-6 w-6 text-blue-400" />
            <span className="ml-2 text-xl font-bold text-white">Fast Reach</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)} className="text-white hover:text-blue-400">
            <Menu className="h-6 w-6" />
          </Button>
        </header>

        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-blue-900">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                    Travel at the Speed of Light
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                    Fast Reach: Making your journey as quick and efficient as possible. Get there faster, do more.
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2">
                  <form className="flex space-x-2">
                    <Input className="max-w-lg flex-1 bg-gray-800 text-white border-gray-700" placeholder="Where to?" type="text" />
                    <Button type="submit" className="bg-blue-400 text-gray-900 hover:bg-blue-300">
                      <Search className="h-4 w-4 mr-2" />
                      Go Fast
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8 text-white">Why Choose Fast Reach?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: Clock, title: 'Time-Saving Routes', description: 'Optimized paths to get you there quicker' },
                  { icon: Map, title: 'Efficient Planning', description: 'Smart itineraries for maximum productivity' },
                  { icon: Bot, title: 'AI Trip Planner', description: 'Personalized travel plans in seconds' },
                ].map((feature, index) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    <feature.icon className="h-12 w-12 mb-4 text-blue-400" />
                    <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-800">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8 text-white">Fast Reach in Action</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: 'New York to LA', time: '4h 30m', image: placeholderImage },
                  { title: 'London to Paris', time: '2h 15m', image: placeholderImage },
                  { title: 'Tokyo to Seoul', time: '2h 45m', image: placeholderImage },
                ].map((route) => (
                  <div key={route.title} className="relative group overflow-hidden rounded-lg shadow-lg">
                    <img
                      alt={route.title}
                      className="object-cover w-full h-60"
                      src={route.image}
                      style={{
                        aspectRatio: '600/400',
                        objectFit: 'cover',
                      }}
                    />
                    <div className="absolute inset-0 bg-gray-900 bg-opacity-75 flex flex-col items-center justify-center">
                      <h3 className="text-white text-2xl font-bold mb-2">{route.title}</h3>
                      <p className="text-blue-400 text-lg font-semibold">Fast Reach Time: {route.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Experience AI-Powered Trip Planning</h2>
                  <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed">
                    Our AI-powered system ensures you get the best routes and travel plans tailored just for you.
                  </p>
                </div>
                <Button className="bg-blue-400 text-gray-900 hover:bg-blue-300">Get Started</Button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
