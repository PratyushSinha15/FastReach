import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Navigation, Loader2 } from 'lucide-react';

export default function TripPlanner() {
  const [currentLocation, setCurrentLocation] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tripPlan, setTripPlan] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('http://localhost:5000/api/trips/generate-trip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startingLocation: currentLocation,
          destination,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate trip plan');
      }

      const data = await response.json();
      setTripPlan(data.tripPlan); // Set the trip plan directly as a string
    } catch (error) {
      setErrorMessage((error as Error).message);
    } finally {
      setIsLoading(false);
    }
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

        {errorMessage && (
          <div className="mt-4 text-red-500 text-center">{errorMessage}</div>
        )}

        {tripPlan && (
          <div className="mt-8 bg-gray-800 border-blue-700 p-4 rounded">
            <h2 className="text-2xl text-blue-400 mb-2">Your Trip Plan</h2>
            <p className="text-gray-300">{tripPlan}</p> {/* Displaying trip plan as simple text */}
          </div>
        )}
      </div>
    </div>
  );
}
