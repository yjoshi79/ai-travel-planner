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
   - Exact Google Maps links

2. A detailed day-by-day itinerary with activities including:
   - Specific time slots
   - Activity/attraction names
   - Brief descriptions
   - Duration
   - Costs in INR
   - Exact Google Maps links

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
      "priceRange": "...",
      "mapUrl": "..."
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
          "cost": "...",
          "mapUrl": "..."
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

  generateMockData(preferences) {
    const { destination, duration, budget, travelers } = preferences;

    const encodedDest = encodeURIComponent(destination);

    const mockHotels = {
      cheap: [
        {
          name: `${destination} Hostel`,
          description: "Budget-friendly hostel with shared facilities",
          priceRange: "INR 1,500-3,000/night",
          mapUrl: `https://www.google.com/maps/place/${encodedDest}+Hostel`
        },
        {
          name: `Budget Inn ${destination}`,
          description: "Simple accommodation with basic amenities",
          priceRange: "INR 2,000-4,000/night",
          mapUrl: `https://www.google.com/maps/place/Budget+Inn+${encodedDest}`
        },
        {
          name: `Backpacker Lodge`,
          description: "Social hostel perfect for budget travelers",
          priceRange: "INR 1,800-3,500/night",
          mapUrl: `https://www.google.com/maps/place/Backpacker+Lodge+${encodedDest}`
        }
      ],
      moderate: [
        {
          name: `${destination} Grand Hotel`,
          description: "Comfortable mid-range hotel with modern amenities",
          priceRange: "INR 6,500-10,000/night",
          mapUrl: `https://www.google.com/maps/place/${encodedDest}+Grand+Hotel`
        },
        {
          name: `City Center Hotel`,
          description: "Well-located hotel with good facilities",
          priceRange: "INR 7,500-11,500/night",
          mapUrl: `https://www.google.com/maps/place/City+Center+Hotel+${encodedDest}`
        },
        {
          name: `Business Hotel ${destination}`,
          description: "Professional hotel with business facilities",
          priceRange: "INR 8,000-12,500/night",
          mapUrl: `https://www.google.com/maps/place/Business+Hotel+${encodedDest}`
        }
      ],
      luxury: [
        {
          name: `${destination} Luxury Resort`,
          description: "5-star luxury hotel with premium amenities",
          priceRange: "INR 25,000-40,000/night",
          mapUrl: `https://www.google.com/maps/place/${encodedDest}+Luxury+Resort`
        },
        {
          name: `Grand Palace Hotel`,
          description: "Opulent hotel with world-class service",
          priceRange: "INR 35,000-50,000/night",
          mapUrl: `https://www.google.com/maps/place/Grand+Palace+Hotel+${encodedDest}`
        },
        {
          name: `${destination} Ritz`,
          description: "Ultra-luxury accommodation with exclusive services",
          priceRange: "INR 40,000-65,000/night",
          mapUrl: `https://www.google.com/maps/place/${encodedDest}+Ritz`
        }
      ]
    };

    const mockActivities = {
      cheap: [
        {
          time: "9:00 AM - 12:00 PM",
          name: "Free Walking Tour",
          description: "Explore the city's main attractions with a local guide",
          duration: "3 hours",
          cost: "Free (tips appreciated)",
          mapUrl: `https://www.google.com/maps/place/Tourist+Information+Center+${encodedDest}`
        },
        {
          time: "12:00 PM - 1:00 PM",
          name: "Local Street Food",
          description: "Try authentic local cuisine at street vendors",
          duration: "1 hour",
          cost: "INR 400-800",
          mapUrl: `https://www.google.com/maps/place/Best+Street+Food+${encodedDest}`
        },
        {
          time: "2:00 PM - 5:00 PM",
          name: "Public Park Visit",
          description: "Relax in the city's beautiful public spaces",
          duration: "3 hours",
          cost: "Free",
          mapUrl: `https://www.google.com/maps/place/Central+Park+${encodedDest}`
        }
      ],
      moderate: [
        {
          time: "9:00 AM - 12:00 PM",
          name: "City Museum",
          description: "Learn about local history and culture",
          duration: "3 hours",
          cost: "INR 1,200-2,000",
          mapUrl: `https://www.google.com/maps/place/City+Museum+${encodedDest}`
        },
        {
          time: "12:00 PM - 1:00 PM",
          name: "Mid-range Restaurant",
          description: "Enjoy local specialties at a recommended restaurant",
          duration: "1 hour",
          cost: "INR 2,000-3,000",
          mapUrl: `https://www.google.com/maps/place/Best+Restaurants+${encodedDest}`
        },
        {
          time: "2:00 PM - 5:00 PM",
          name: "Guided City Tour",
          description: "Professional tour of major attractions",
          duration: "3 hours",
          cost: "INR 3,000-5,000",
          mapUrl: `https://www.google.com/maps/place/Tourist+Attractions+${encodedDest}`
        }
      ],
      luxury: [
        {
          time: "9:00 AM - 12:00 PM",
          name: "Private Museum Tour",
          description: "Exclusive guided tour with expert curator",
          duration: "3 hours",
          cost: "INR 12,000-16,000",
          mapUrl: `https://www.google.com/maps/place/National+Museum+${encodedDest}`
        },
        {
          time: "12:00 PM - 2:00 PM",
          name: "Fine Dining Experience",
          description: "Michelin-starred restaurant with wine pairing",
          duration: "2 hours",
          cost: "INR 8,000-16,000",
          mapUrl: `https://www.google.com/maps/place/Luxury+Restaurants+${encodedDest}`
        },
        {
          time: "3:00 PM - 6:00 PM",
          name: "Private Helicopter Tour",
          description: "Aerial view of the city's landmarks",
          duration: "3 hours",
          cost: "INR 25,000-40,000",
          mapUrl: `https://www.google.com/maps/place/Heliport+${encodedDest}`
        }
      ]
    };

    const itinerary = Array.from({ length: parseInt(duration) }, (_, i) => ({
      day: i + 1,
      activities: mockActivities[budget] || mockActivities.moderate
    }));

    return {
      destination,
      description: `${destination} is a vibrant destination offering a perfect blend of history, culture, and modern attractions.`,
      stats: {
        historicSites: "50",
        museums: "25",
        restaurants: "3500"
      },
      duration,
      budget,
      travelers,
      hotels: mockHotels[budget] || mockHotels.moderate,
      itinerary
    };
  }
}

export default new TravelAIService();
