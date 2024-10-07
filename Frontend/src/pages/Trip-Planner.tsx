import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Navigation, Loader2 } from 'lucide-react'

type TripPlan = {
  steps: string[];
} | null;

export default function TripPlanner() {
  const [currentLocation, setCurrentLocation] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tripPlan, setTripPlan] = useState<TripPlan>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call to generate trip plan
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setTripPlan({
      steps: [
        "Start from your current location",
        "Head north on Main St",
        "Turn right onto Broadway",
        "Continue for 2 miles",
        "Arrive at your destination"
      ]
    });
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-400">FastReach Trip Planner</h1>
        <Card className="bg-gray-800 border-blue-700">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-400">Plan Your Trip</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="currentLocation" className="block text-sm font-medium text-gray-300">
                  Current Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <Input
                    id="currentLocation"
                    type="text"
                    placeholder="Enter your current location"
                    value={currentLocation}
                    onChange={(e) => setCurrentLocation(e.target.value)}
                    className="pl-10 bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                    required
                    aria-required="true"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="destination" className="block text-sm font-medium text-gray-300">
                  Destination
                </label>
                <div className="relative">
                  <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <Input
                    id="destination"
                    type="text"
                    placeholder="Enter your destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="pl-10 bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                    required
                    aria-required="true"
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Plan...
                  </>
                ) : (
                  'Generate Trip Plan'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {tripPlan && (
          <Card className="mt-8 bg-gray-800 border-blue-700">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-400">Your Trip Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2">
                {tripPlan.steps.map((step, index) => (
                  <li key={index} className="text-gray-300">{step}</li>
                ))}
              </ol>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
