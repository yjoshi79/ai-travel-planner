import { CohereClient } from 'cohere-ai';

class TravelAIService {
  constructor() {
    this.cohere = new CohereClient({
      token: import.meta.env.VITE_COHERE_API_KEY
    });
  }

  async generateTripItinerary(preferences) {
    try {
      const { destination, duration, budget, travelers } = preferences;

      const prompt = `Generate a detailed travel itinerary for the following trip:

Destination: ${destination}
Duration: ${duration} days
Budget: ${budget} (cheap = budget-conscious, moderate = mid-range, luxury = high-end)
Travelers: ${travelers} (solo = 1 person, couple = 2 people, family = 3-4 people, friends = 4+ people)

Please provide a comprehensive travel plan with:

1. 3 hotel recommendations including:
   - Hotel names
   - Brief descriptions
   - Price ranges in INR

2. A detailed day-by-day itinerary with activities including:
   - Specific time slots
   - Activity/attraction names
   - Brief descriptions
   - Duration
   - Costs in INR

Make sure the recommendations are appropriate for the budget level.

Return only the JSON object with this structure:
{
  "destination": "...",
  "description": "...",
  "stats": {
    "historicSites": "...",
    "museums": "...",
    "restaurants": "..."
  },
  "duration": "...",
  "budget": "...",
  "travelers": "...",
  "hotels": [
    {
      "name": "...",
      "description": "...",
      "priceRange": "..."
    }
  ],
  "itinerary": [
    {
      "day": 1,
      "activities": [
        {
          "time": "...",
          "name": "...",
          "description": "...",
          "duration": "...",
          "cost": "..."
        }
      ]
    }
  ]
}`;

      const response = await this.cohere.generate({
        model: 'command',
        prompt,
        maxTokens: 3000,
        temperature: 0.7
      });

      const generatedText = response.generations[0].text.trim();

      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          return JSON.parse(jsonMatch[0]);
        } catch (parseError) {
          console.error('JSON parsing error:', parseError);
          throw new Error('Failed to parse AI response');
        }
      } else {
        throw new Error('No valid JSON found in response');
      }

    } catch (error) {
      console.error('Error generating trip:', error);
      throw error;
    }
  }
}

export default new TravelAIService();
