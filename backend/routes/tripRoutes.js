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
      console.error('Missing starting location or destination.');
      return res.status(400).send({ error: 'Both starting location and destination are required.' });
    }

    // Create the trip planning prompt
    const prompt = `Plan a trip from ${startingLocation} to ${destination}. Provide details about travel costs, accommodation, attractions, etc.`;
    console.log('Prompt:', prompt);

    const genAI = new GoogleGenerativeAI(process.env.API_KEY);

    // Define the model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    // Use the model to generate content based on the prompt
    const result = await model.generateContent(prompt);

    // Log API response
    console.log('API Response:', result.response.text());

    // Check if result contains text
    if (!result || !result.text) {
      console.error('Failed to generate trip plan content.');
      return res.status(500).send({ error: 'Failed to generate trip plan content.' });
    }

    // Send the generated trip plan to the frontend
    res.status(200).send({ tripPlan: result.response.text() });
  } catch (error) {
    console.error('Error generating trip plan:', error.message);
    res.status(500).send({ error: 'Failed to generate trip plan.' });
  }
});

module.exports = router;
