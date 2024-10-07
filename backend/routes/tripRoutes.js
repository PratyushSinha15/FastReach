// routes/tripRoutes.js
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const router = express.Router();
require('dotenv').config();

// Route to generate trip plan
router.post('/generate-trip', async (req, res) => {
  try {
    const { startingLocation, destination } = req.body;
    
    // Validate input
    if (!startingLocation || !destination) {
      return res.status(400).send({ error: 'Both starting location and destination are required.' });
    }
    
    const prompt = `Plan a trip from ${startingLocation} to ${destination}. Provide the following details:Estimated Travel Time:By Flight (if available): Duration of direct flights.By Train: Estimated travel time based on the train services available.By Car: Estimated driving time (including the distance in kilometers).By Bus: Estimated time based on the bus services available.Estimated Travel Costs:By Flight: Average one-way ticket price.By Train: Ticket prices for different classes (AC 2-tier, 3-tier, sleeper, etc.).By Car: Approximate fuel and toll costs for the trip.By Bus: Ticket prices for available bus services (AC Volvo, sleeper, etc.).Accommodation: Options from budget to luxury hotels with price ranges per night.Meals: Estimated daily food costs based on local prices and preferences.Key Stops and Attractions Along the Route:Highlight any important cities, attractions, or landmarks that can be visited during the journey from [User's StartingLocation] to [User's Destination].Suggestions for Restaurants, Cafes, and Local Specialties:Popular restaurants and cafes at the destination.Recommendations for local street food and must-try dishes.Popular Tourist Attractions and Hidden Gems at [User's Destination]:List the main tourist spots and lesser-known gems to explore in the destination city.Local Events or Festivals:Provide information about any upcoming local events or festivals happening during the user’s travel period.Recommendations for Accommodations:Based on the user’s preferences, suggest budget-friendly, mid-range, and luxury options.Travel Tips:Include local travel tips, customs, and cultural practices to enhance the user’s experience.Provide insights on the best time to visit based on weather or seasonal factors.Final Estimated Costs: Total travel costs (including transportation, accommodation, meals, and activities).Suggested amount of money the user should carry based on their preferences (budget, mid-range, luxury).`;

    const genAI = new GoogleGenerativeAI({
        apiKey: process.env.GEMINI_API_KEY
      });

    // Get the model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Generate content
    const result = await model.generateContent({ prompt });

    // Check if result contains text
    if (!result.data || !result.data.text) {
      return res.status(500).send({ error: 'Failed to generate trip plan content.' });
    }

    // Send the generated content as a response to the frontend
    res.send({ tripPlan: result.data.text });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).send({ error: 'Failed to generate trip plan' });
  }
});

module.exports = router;
