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

1. 3 hotel recommendations with names, descriptions, and price ranges
2. A detailed day-by-day itinerary with activities for each day including:
   - Specific time slots for each activity
   - Activity/attraction names
   - Brief but informative descriptions
   - Estimated duration for each activity
   - Approximate costs (use $ amounts or "Free" for free activities)

Make sure the recommendations are appropriate for the budget level:
- Cheap: Budget-friendly options, free activities, local food
- Moderate: Mid-range hotels and restaurants, mix of paid and free activities
- Luxury: High-end accommodations, fine dining, premium experiences

Format the response as a valid JSON object with this exact structure:
{
  "destination": "${destination}",
  "duration": "${duration}",
  "budget": "${budget}",
  "travelers": "${travelers}",
  "hotels": [
    {
      "name": "Hotel Name",
      "description": "Brief description of the hotel",
      "priceRange": "$XX-XX/night"
    }
  ],
  "itinerary": [
    {
      "day": 1,
      "activities": [
        {
          "time": "9:00 AM - 12:00 PM",
          "name": "Activity Name",
          "description": "Description of the activity",
          "duration": "X hours",
          "cost": "$XX or Free"
        }
      ]
    }
  ]
}

Important: Return only the JSON object, no additional text.`;

      const response = await this.cohere.generate({
        model: 'command',
        prompt: prompt,
        maxTokens: 3000,
        temperature: 0.7,
        stopSequences: []
      });

      const generatedText = response.generations[0].text.trim();
      
      // Try to extract JSON from the response
      let jsonMatch = generatedText.match(/\{[\s\S]*\}/);
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

  // Fallback mock data generator
  generateMockData(preferences) {
    const { destination, duration, budget, travelers } = preferences;
    
    const mockHotels = {
      cheap: [
        { name: `${destination} Hostel`, description: "Budget-friendly hostel with shared facilities", priceRange: "$20-40/night" },
        { name: `Budget Inn ${destination}`, description: "Simple accommodation with basic amenities", priceRange: "$30-50/night" },
        { name: `Backpacker Lodge`, description: "Social hostel perfect for budget travelers", priceRange: "$25-45/night" }
      ],
      moderate: [
        { name: `${destination} Grand Hotel`, description: "Comfortable mid-range hotel with modern amenities", priceRange: "$80-120/night" },
        { name: `City Center Hotel`, description: "Well-located hotel with good facilities", priceRange: "$90-140/night" },
        { name: `Business Hotel ${destination}`, description: "Professional hotel with business facilities", priceRange: "$100-150/night" }
      ],
      luxury: [
        { name: `${destination} Luxury Resort`, description: "5-star luxury hotel with premium amenities", priceRange: "$300-500/night" },
        { name: `Grand Palace Hotel`, description: "Opulent hotel with world-class service", priceRange: "$400-600/night" },
        { name: `${destination} Ritz`, description: "Ultra-luxury accommodation with exclusive services", priceRange: "$500-800/night" }
      ]
    };

    const mockActivities = {
      cheap: [
        { time: "9:00 AM - 12:00 PM", name: "Free Walking Tour", description: "Explore the city's main attractions with a local guide", duration: "3 hours", cost: "Free (tips appreciated)" },
        { time: "12:00 PM - 1:00 PM", name: "Local Street Food", description: "Try authentic local cuisine at street vendors", duration: "1 hour", cost: "$5-10" },
        { time: "2:00 PM - 5:00 PM", name: "Public Park Visit", description: "Relax in the city's beautiful public spaces", duration: "3 hours", cost: "Free" }
      ],
      moderate: [
        { time: "9:00 AM - 12:00 PM", name: "City Museum", description: "Learn about local history and culture", duration: "3 hours", cost: "$15-25" },
        { time: "12:00 PM - 1:00 PM", name: "Mid-range Restaurant", description: "Enjoy local specialties at a recommended restaurant", duration: "1 hour", cost: "$25-35" },
        { time: "2:00 PM - 5:00 PM", name: "Guided City Tour", description: "Professional tour of major attractions", duration: "3 hours", cost: "$40-60" }
      ],
      luxury: [
        { time: "9:00 AM - 12:00 PM", name: "Private Museum Tour", description: "Exclusive guided tour with expert curator", duration: "3 hours", cost: "$150-200" },
        { time: "12:00 PM - 2:00 PM", name: "Fine Dining Experience", description: "Michelin-starred restaurant with wine pairing", duration: "2 hours", cost: "$100-200" },
        { time: "3:00 PM - 6:00 PM", name: "Private Helicopter Tour", description: "Aerial view of the city's landmarks", duration: "3 hours", cost: "$300-500" }
      ]
    };

    return {
      destination,
      duration,
      budget,
      travelers,
      hotels: mockHotels[budget] || mockHotels.moderate,
      itinerary: Array.from({ length: parseInt(duration) }, (_, i) => ({
        day: i + 1,
        activities: mockActivities[budget] || mockActivities.moderate
      }))
    };
  }
}

export default new TravelAIService();
