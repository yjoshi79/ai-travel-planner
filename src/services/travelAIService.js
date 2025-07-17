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
   - Approximate costs in INR (use "Free" for free activities)

Make sure the recommendations are appropriate for the budget level:
- Cheap: Budget-friendly options (INR 1,000-5,000), free activities, local food
- Moderate: Mid-range options (INR 5,000-15,000), mix of paid and free activities
- Luxury: High-end options (INR 15,000+), fine dining, premium experiences

Format the response as a valid JSON object with this exact structure:
{
  "destination": "${destination}",
  "description": "A detailed description of the destination highlighting its unique features, culture, and main attractions",
  "stats": {
    "historicSites": "number of historic sites (just the number)",
    "museums": "number of museums (just the number)",
    "restaurants": "number of restaurants (just the number)"
  },
  "duration": "${duration}",
  "budget": "${budget}",
  "travelers": "${travelers}",
  "hotels": [
    {
      "name": "Hotel Name",
      "description": "Brief description of the hotel",
      "priceRange": "INR XX,XXX-XX,XXX/night",
      "mapUrl": "https://www.google.com/maps/search/hotel+name+in+destination"
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
          "cost": "INR X,XXX-X,XXX",
          "mapUrl": "https://www.google.com/maps/search/activity+in+destination"
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
        { name: `${destination} Hostel`, description: "Budget-friendly hostel with shared facilities", priceRange: "INR 1,500-3,000/night", mapUrl: `https://www.google.com/maps/place/${encodeURIComponent(destination)}+Hostel` },
        { name: `Budget Inn ${destination}`, description: "Simple accommodation with basic amenities", priceRange: "INR 2,000-4,000/night", mapUrl: `https://www.google.com/maps/place/Budget+Inn+${encodeURIComponent(destination)}` },
        { name: `Backpacker Lodge`, description: "Social hostel perfect for budget travelers", priceRange: "INR 1,800-3,500/night", mapUrl: `https://www.google.com/maps/place/Backpacker+Lodge+${encodeURIComponent(destination)}` }
      ],
      moderate: [
        { name: `${destination} Grand Hotel`, description: "Comfortable mid-range hotel with modern amenities", priceRange: "INR 6,500-10,000/night", mapUrl: `https://www.google.com/maps/place/${encodeURIComponent(destination)}+Grand+Hotel` },
        { name: `City Center Hotel`, description: "Well-located hotel with good facilities", priceRange: "INR 7,500-11,500/night", mapUrl: `https://www.google.com/maps/place/${encodeURIComponent(destination)}+City+Center+Hotel` },
        { name: `Business Hotel ${destination}`, description: "Professional hotel with business facilities", priceRange: "INR 8,000-12,500/night", mapUrl: `https://www.google.com/maps/place/Business+Hotel+${encodeURIComponent(destination)}` }
      ],
      luxury: [
        { name: `${destination} Luxury Resort`, description: "5-star luxury hotel with premium amenities", priceRange: "INR 25,000-40,000/night", mapUrl: `https://www.google.com/maps/place/${encodeURIComponent(destination)}+Luxury+Resort` },
        { name: `Grand Palace Hotel`, description: "Opulent hotel with world-class service", priceRange: "INR 35,000-50,000/night", mapUrl: `https://www.google.com/maps/place/${encodeURIComponent(destination)}+Grand+Palace+Hotel` },
        { name: `${destination} Ritz`, description: "Ultra-luxury accommodation with exclusive services", priceRange: "INR 40,000-65,000/night", mapUrl: `https://www.google.com/maps/place/${encodeURIComponent(destination)}+Ritz` }
      ]
    };

    const mockActivities = {
      cheap: [
        { time: "9:00 AM - 12:00 PM", name: "Free Walking Tour", description: "Explore the city's main attractions with a local guide", duration: "3 hours", cost: "Free (tips appreciated)", mapUrl: `https://www.google.com/maps/place/tourist+information+center+${encodeURIComponent(destination)}` },
        { time: "12:00 PM - 1:00 PM", name: "Local Street Food", description: "Try authentic local cuisine at street vendors", duration: "1 hour", cost: "INR 400-800", mapUrl: `https://www.google.com/maps/place/best+street+food+${encodeURIComponent(destination)}` },
        { time: "2:00 PM - 5:00 PM", name: "Public Park Visit", description: "Relax in the city's beautiful public spaces", duration: "3 hours", cost: "Free", mapUrl: `https://www.google.com/maps/place/central+park+${encodeURIComponent(destination)}` }
      ],
      moderate: [
        { time: "9:00 AM - 12:00 PM", name: "City Museum", description: "Learn about local history and culture", duration: "3 hours", cost: "INR 1,200-2,000", mapUrl: `https://www.google.com/maps/place/city+museum+${encodeURIComponent(destination)}` },
        { time: "12:00 PM - 1:00 PM", name: "Mid-range Restaurant", description: "Enjoy local specialties at a recommended restaurant", duration: "1 hour", cost: "INR 2,000-3,000", mapUrl: `https://www.google.com/maps/place/best+restaurants+${encodeURIComponent(destination)}` },
        { time: "2:00 PM - 5:00 PM", name: "Guided City Tour", description: "Professional tour of major attractions", duration: "3 hours", cost: "INR 3,000-5,000", mapUrl: `https://www.google.com/maps/place/tourist+attractions+${encodeURIComponent(destination)}` }
      ],
      luxury: [
        { time: "9:00 AM - 12:00 PM", name: "Private Museum Tour", description: "Exclusive guided tour with expert curator", duration: "3 hours", cost: "INR 12,000-16,000", mapUrl: `https://www.google.com/maps/place/national+museum+${encodeURIComponent(destination)}` },
        { time: "12:00 PM - 2:00 PM", name: "Fine Dining Experience", description: "Michelin-starred restaurant with wine pairing", duration: "2 hours", cost: "INR 8,000-16,000", mapUrl: `https://www.google.com/maps/place/luxury+restaurants+${encodeURIComponent(destination)}` },
        { time: "3:00 PM - 6:00 PM", name: "Private Helicopter Tour", description: "Aerial view of the city's landmarks", duration: "3 hours", cost: "INR 25,000-40,000", mapUrl: `https://www.google.com/maps/place/heliport+${encodeURIComponent(destination)}` }
      ]
    };

    return {
      destination,
      description: `${destination} is a vibrant destination offering a perfect blend of history, culture, and modern attractions. Visitors can explore numerous historic landmarks, world-class museums, and enjoy diverse culinary experiences across its many restaurants.`,
      stats: {
        historicSites: "50",
        museums: "25",
        restaurants: "3500"
      },
      duration,
      budget,
      travelers,
      hotels: mockHotels[budget] || mockHotels.moderate,
      itinerary: Array.from({ length: parseInt(duration) }, (_, i) => {
        const activities = (mockActivities[budget] || mockActivities.moderate).map(activity => ({
          ...activity,
          mapUrl: activity.mapUrl + encodeURIComponent(destination)
        }));
        return {
          day: i + 1,
          activities
        };
      })
    };
  }
}

export default new TravelAIService();
