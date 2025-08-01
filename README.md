# Travel AI Planner

A modern, AI-powered travel planning application built with React.js and Material-UI. This app helps users create personalized travel itineraries using Cohere AI, tailored to their interests and budget.

## Features

- **AI-Powered Itinerary Generation**: Create custom travel plans using Cohere AI based on user preferences
- **Smart Preferences System**: Collects destination, duration, budget, and traveler type preferences
- **Dynamic Hotel Recommendations**: AI-generated hotel suggestions based on budget and preferences
- **Detailed Day-by-Day Itineraries**: Complete schedules with activities, timings, and costs
- **Modern UI Design**: Beautiful dark theme with purple gradient design
- **Responsive Layout**: Works seamlessly on desktop and mobile devices
- **Material-UI Components**: Professional and accessible user interface
- **Interactive Planning**: Preview and customize your travel plans

## Technology Stack

- **Frontend**: React.js with Vite
- **UI Library**: Material-UI (MUI)
- **Styling**: Emotion (CSS-in-JS)
- **Icons**: Material-UI Icons
- **AI Integration**: Cohere AI API
- **Routing**: React Router DOM
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Cohere AI API key (get one from [Cohere Dashboard](https://dashboard.cohere.ai/))

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Add your Cohere API key to the `.env` file:
     ```
     VITE_COHERE_API_KEY=your_cohere_api_key_here
     ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## API Integration

This application uses Cohere AI to generate personalized travel itineraries. The AI service:

- Analyzes user preferences (destination, duration, budget, travelers)
- Generates contextually appropriate hotel recommendations
- Creates detailed day-by-day itineraries with activities, timings, and costs
- Adapts suggestions based on budget constraints and traveler type

**Note**: For production use, consider implementing a backend server to handle API calls securely and avoid exposing your API key in the frontend.

## Project Structure

```
src/
├── components/
│   ├── Home.jsx                 # Main homepage component
│   ├── TravelPreferences.jsx    # User preferences form
│   └── TripResults.jsx          # AI-generated itinerary display
├── services/
│   └── travelAIService.js       # Cohere AI integration service
├── App.jsx                      # Main app component with routing
├── index.css                    # Global styles
└── main.jsx                     # Entry point
```

## Usage

1. **Home Page**: Welcome screen with "Get Started" button
2. **Preferences**: Select destination, duration, budget, and traveler type
3. **Results**: AI-generated itinerary with hotels and day-by-day activities

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the MIT License.+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
#   a i - t r a v e l - p l a n n e r 
 
 