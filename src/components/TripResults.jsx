import { 
  Box, 
  Typography, 
  Button, 
  Container,
  useTheme,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  CircularProgress
} from '@mui/material';
import { 
  CalendarToday,
  AttachMoney,
  Group,
  AccessTime,
  Send,
  Schedule,
  FlightRounded,
  LocationOnRounded,
  HotelRounded,
  RestaurantRounded,
  AttractionsRounded,
  FlightTakeoff
} from '@mui/icons-material';
import Header from './Header';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import travelAIService from '../services/travelAIService';
import FloatingOrbs from './FloatingOrbs';
import { keyframes } from '@emotion/react';

// Define keyframes
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const float2 = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const float3 = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-25px); }
  100% { transform: translateY(0px); }
`;

const orbFloat = keyframes`
  0% { transform: translate(0, 0); }
  50% { transform: translate(10px, -10px); }
  100% { transform: translate(0, 0); }
`;

const orbGlow = keyframes`
  0% { opacity: 0.5; }
  50% { opacity: 0.8; }
  100% { opacity: 0.5; }
`;

const orbPulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const orbRotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const TripResults = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get user preferences from navigation state
  const userPreferences = location.state?.preferences || {};

  // Floating elements component
  const FloatingElements = () => (
    <>
      {/* Floating Color Orbs - Large */}
      <Box
        sx={{
          position: 'fixed',
          top: '5%',
          left: '10%',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(139, 92, 246, 0.1) 70%, transparent 100%)',
          animation: `${orbFloat} 8s ease-in-out infinite, ${orbGlow} 6s ease-in-out infinite`,
          zIndex: 0,
          filter: 'blur(1px)',
        }}
      />

      <Box
        sx={{
          position: 'fixed',
          top: '20%',
          right: '5%',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, rgba(236, 72, 153, 0.1) 70%, transparent 100%)',
          animation: `${orbFloat} 10s ease-in-out infinite reverse, ${orbGlow} 7s ease-in-out infinite`,
          zIndex: 0,
          filter: 'blur(1px)',
        }}
      />

      <Box
        sx={{
          position: 'fixed',
          bottom: '15%',
          left: '5%',
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, rgba(147, 51, 234, 0.1) 70%, transparent 100%)',
          animation: `${orbFloat} 12s ease-in-out infinite, ${orbPulse} 5s ease-in-out infinite`,
          zIndex: 0,
          filter: 'blur(1px)',
        }}
      />

      <Box
        sx={{
          position: 'fixed',
          bottom: '10%',
          right: '15%',
          width: '110px',
          height: '110px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(168, 85, 247, 0.1) 70%, transparent 100%)',
          animation: `${orbFloat} 9s ease-in-out infinite reverse, ${orbGlow} 8s ease-in-out infinite`,
          zIndex: 0,
          filter: 'blur(1px)',
        }}
      />

      {/* Floating Color Orbs - Medium */}
      <Box
        sx={{
          position: 'fixed',
          top: '35%',
          left: '15%',
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.5) 0%, rgba(236, 72, 153, 0.2) 60%, transparent 100%)',
          animation: `${orbPulse} 4s ease-in-out infinite, ${orbRotate} 20s linear infinite`,
          zIndex: 0,
          filter: 'blur(0.5px)',
        }}
      />

      <Box
        sx={{
          position: 'fixed',
          top: '60%',
          right: '20%',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, rgba(139, 92, 246, 0.2) 60%, transparent 100%)',
          animation: `${orbPulse} 6s ease-in-out infinite, ${orbRotate} 25s linear infinite reverse`,
          zIndex: 0,
          filter: 'blur(0.5px)',
        }}
      />

      <Box
        sx={{
          position: 'fixed',
          top: '45%',
          right: '10%',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(192, 132, 252, 0.5) 0%, rgba(192, 132, 252, 0.2) 60%, transparent 100%)',
          animation: `${orbFloat} 7s ease-in-out infinite, ${orbGlow} 5s ease-in-out infinite`,
          zIndex: 0,
          filter: 'blur(0.5px)',
        }}
      />

      {/* Floating Color Orbs - Small */}
      <Box
        sx={{
          position: 'fixed',
          top: '25%',
          left: '25%',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.6) 0%, rgba(236, 72, 153, 0.3) 50%, transparent 100%)',
          animation: `${orbPulse} 3s ease-in-out infinite, ${orbFloat} 6s ease-in-out infinite`,
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          position: 'fixed',
          top: '70%',
          left: '30%',
          width: '35px',
          height: '35px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, rgba(139, 92, 246, 0.3) 50%, transparent 100%)',
          animation: `${orbPulse} 4s ease-in-out infinite reverse, ${orbFloat} 8s ease-in-out infinite reverse`,
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          position: 'fixed',
          bottom: '40%',
          right: '25%',
          width: '45px',
          height: '45px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.6) 0%, rgba(147, 51, 234, 0.3) 50%, transparent 100%)',
          animation: `${orbPulse} 5s ease-in-out infinite, ${orbRotate} 15s linear infinite`,
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          position: 'fixed',
          bottom: '25%',
          left: '20%',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, rgba(168, 85, 247, 0.3) 50%, transparent 100%)',
          animation: `${orbGlow} 4s ease-in-out infinite, ${orbFloat} 7s ease-in-out infinite`,
          zIndex: 0,
        }}
      />

      {/* Floating Color Orbs - Extra Small */}
      <Box
        sx={{
          position: 'fixed',
          top: '15%',
          left: '40%',
          width: '25px',
          height: '25px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.7) 0%, transparent 100%)',
          animation: `${orbPulse} 2s ease-in-out infinite, ${orbFloat} 5s ease-in-out infinite`,
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          position: 'fixed',
          top: '50%',
          left: '5%',
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.7) 0%, transparent 100%)',
          animation: `${orbPulse} 3s ease-in-out infinite reverse, ${orbRotate} 10s linear infinite`,
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          position: 'fixed',
          bottom: '35%',
          right: '5%',
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(192, 132, 252, 0.7) 0%, transparent 100%)',
          animation: `${orbGlow} 3s ease-in-out infinite, ${orbFloat} 6s ease-in-out infinite reverse`,
          zIndex: 0,
        }}
      />

      {/* Original floating travel icons */}
      <Box
        sx={{
          position: 'fixed',
          top: '10%',
          left: '5%',
          zIndex: 1,
          animation: `${float} 6s ease-in-out infinite`,
          color: theme.palette.primary.main,
          opacity: 0.3,
        }}
      >
        <FlightRounded sx={{ fontSize: '3rem' }} />
      </Box>
      
      <Box
        sx={{
          position: 'fixed',
          top: '15%',
          right: '8%',
          zIndex: 1,
          animation: `${float2} 8s ease-in-out infinite`,
          color: '#EC4899',
          opacity: 0.4,
        }}
      >
        <LocationOnRounded sx={{ fontSize: '2.5rem' }} />
      </Box>

      <Box
        sx={{
          position: 'fixed',
          top: '30%',
          left: '3%',
          zIndex: 1,
          animation: `${float3} 7s ease-in-out infinite`,
          color: '#8B5CF6',
          opacity: 0.3,
        }}
      >
        <HotelRounded sx={{ fontSize: '2.8rem' }} />
      </Box>

      <Box
        sx={{
          position: 'fixed',
          top: '50%',
          right: '5%',
          zIndex: 1,
          animation: `${float} 9s ease-in-out infinite`,
          color: theme.palette.primary.main,
          opacity: 0.35,
        }}
      >
        <RestaurantRounded sx={{ fontSize: '2.2rem' }} />
      </Box>

      <Box
        sx={{
          position: 'fixed',
          top: '70%',
          left: '7%',
          zIndex: 1,
          animation: `${float2} 5s ease-in-out infinite`,
          color: '#EC4899',
          opacity: 0.3,
        }}
      >
        <AttractionsRounded sx={{ fontSize: '3.2rem' }} />
      </Box>

      <Box
        sx={{
          position: 'fixed',
          bottom: '20%',
          right: '10%',
          zIndex: 1,
          animation: `${float3} 6s ease-in-out infinite`,
          color: '#8B5CF6',
          opacity: 0.4,
        }}
      >
        <FlightTakeoff sx={{ fontSize: '2.8rem', transform: 'rotate(-45deg)' }} />
      </Box>
    </>
  );

  useEffect(() => {
    generateTripItinerary();
  }, []);

  const generateTripItinerary = async () => {
    try {
      setLoading(true);
      
      // Check if we have user preferences
      if (!userPreferences || Object.keys(userPreferences).length === 0) {
        setError('No preferences found. Please start over.');
        return;
      }

      // Use the travel AI service to generate the itinerary
      const tripData = await travelAIService.generateTripItinerary(userPreferences);
      setTripData(tripData);
      
    } catch (error) {
      console.error('Error generating trip:', error);
      setError('Failed to generate trip with AI. Using sample data.');
      
      // Use mock data as fallback
      const mockData = {
        destination: 'Paris',
        duration: '4',
        budget: 'cheap',
        travelers: 'solo',
        hotels: [
          {
            name: 'Hotel de Ville',
            description: 'Elegant hotel in the heart of Paris with stunning views of the city.',
            priceRange: '€200-300 per night'
          },
          {
            name: 'Champs-Élysées Plaza',
            description: 'Luxury accommodation near the famous avenue with world-class amenities.',
            priceRange: '€300-400 per night'
          }
        ],
        itinerary: [
          {
            day: 1,
            activities: [
              {
                time: '9:00 AM - 12:00 PM',
                name: 'Eiffel Tower Visit',
                description: 'Start your day with a visit to the iconic Eiffel Tower. Enjoy panoramic views of Paris.',
                duration: '3 hours',
                cost: '€30'
              },
              {
                time: '2:00 PM - 5:00 PM',
                name: 'Louvre Museum',
                description: 'Explore the world\'s largest art museum and see the famous Mona Lisa.',
                duration: '3 hours',
                cost: '€20'
              }
            ]
          },
          {
            day: 2,
            activities: [
              {
                time: '10:00 AM - 1:00 PM',
                name: 'Notre-Dame Cathedral',
                description: 'Visit the medieval Catholic cathedral known for its French Gothic architecture.',
                duration: '3 hours',
                cost: 'Free'
              },
              {
                time: '3:00 PM - 6:00 PM',
                name: 'Seine River Cruise',
                description: 'Enjoy a relaxing cruise along the Seine River with commentary on Paris landmarks.',
                duration: '3 hours',
                cost: '€25'
              }
            ]
          }
        ]
      };
      setTripData(mockData);
    } finally {
      setLoading(false);
    }
  };

  const getBudgetDisplay = (budget) => {
    const budgetMap = {
      cheap: { label: 'Cheap Budget', icon: '💵' },
      moderate: { label: 'Moderate Budget', icon: '💰' },
      luxury: { label: 'Luxury Budget', icon: '💎' }
    };
    return budgetMap[budget] || { label: 'Moderate Budget', icon: '💰' };
  };

  const getTravelersDisplay = (travelers) => {
    const travelersMap = {
      solo: { label: 'Solo Traveler', count: '1' },
      couple: { label: 'Couple', count: '2' },
      family: { label: 'Family', count: '3-4' },
      friends: { label: 'Friends', count: '4+' }
    };
    return travelersMap[travelers] || { label: 'Solo Traveler', count: '1' };
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: `linear-gradient(135deg, 
            ${theme.palette.background.default} 0%, 
            #1E293B 25%, 
            #334155 50%, 
            #475569 75%, 
            #64748B 100%
          )`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <FloatingOrbs/>
        <Box sx={{ textAlign: 'center', color: 'white' }}>
          <CircularProgress 
            sx={{ 
              color: theme.palette.primary.main,
              mb: 2 
            }} 
            size={60} 
          />
          <Typography variant="h6" sx={{ mb: 1 }}>
            Generating Your Perfect Trip...
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            AI is creating a personalized itinerary just for you
          </Typography>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: `linear-gradient(135deg, 
            ${theme.palette.background.default} 0%, 
            #1E293B 25%, 
            #334155 50%, 
            #475569 75%, 
            #64748B 100%
          )`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ textAlign: 'center', color: 'white' }}>
          <Typography variant="h6" sx={{ mb: 2, color: theme.palette.error.main }}>
            {error}
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/preferences')}
            sx={{
              background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
              '&:hover': {
                background: 'linear-gradient(45deg, #7C3AED, #DB2777)',
              }
            }}
          >
            Try Again
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, 
          ${theme.palette.background.default} 0%, 
          #1E293B 25%, 
          #334155 50%, 
          #475569 75%, 
          #64748B 100%
        )`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <FloatingOrbs/>
      {/* Paris Description */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 100%)',
          zIndex: -1,
        }}
      />

      {/* Floating Background Elements */}
      <FloatingElements />
      {/* Header Component */}
      <Header />

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 4, position: 'relative', zIndex: 5 }}>
        {/* Trip Summary Header */}
        <Paper
          elevation={0}
          sx={{
            background: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
            borderRadius: '24px',
            p: 4,
            mb: 4,
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 10px 30px rgba(236, 72, 153, 0.3)'
            }
          }
        }>
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography 
              variant="h2" 
              sx={{ 
                color: 'white', 
                fontWeight: 700, 
                mb: 2,
                fontSize: { xs: '2rem', md: '2.5rem' }
              }}
            >
              {tripData?.destination || 'Paris'}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Chip
                icon={<CalendarToday />}
                label={`${tripData?.duration || '4'} Days`}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  '& .MuiChip-icon': { color: 'white' }
                }}
              />
              <Chip
                icon={<AttachMoney />}
                label={getBudgetDisplay(tripData?.budget).label}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  '& .MuiChip-icon': { color: 'white' }
                }}
              />
              <Chip
                icon={<Group />}
                label={`No. Of Traveler: ${getTravelersDisplay(tripData?.travelers).count}`}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  '& .MuiChip-icon': { color: 'white' }
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              top: 20,
              right: 20,
              zIndex: 1,
            }}
          >
            <Send 
              sx={{ 
                color: 'white', 
                fontSize: '2rem',
                transform: 'rotate(45deg)'
              }} 
            />
          </Box>
        </Paper>

        <Box sx={{ mb: 4 }}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
              borderRadius: '24px',
              p: 4,
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 10px 30px rgba(236, 72, 153, 0.3)'
              }
            }}
          >
            <Box sx={{ maxWidth: '800px', margin: '0 auto' }}>
              <Typography
                variant="h3"
                sx={{
                  color: 'white',
                  textAlign: 'center',
                  mb: 3,
                  fontWeight: 700,
                  fontSize: '2.5rem'
                }}
              >
                Discover Paris
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  textAlign: 'center',
                  mb: 3,
                  lineHeight: 1.8,
                  fontSize: '1.1rem'
                }}
              >
                Welcome to the City of Light, where timeless elegance meets contemporary charm. Paris, a global epicenter of art, fashion, gastronomy, and culture, invites you to explore its enchanting streets and discover the magic that has captivated visitors for centuries.
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 4,
                  flexWrap: 'wrap',
                  mt: 4
                }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, mb: 1 }}>850+</Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>Historic Sites</Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, mb: 1 }}>130+</Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>Museums</Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, mb: 1 }}>40K+</Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>Restaurants</Typography>
                </Box>
              </Box>
            </Box>
          </Card>
        </Box>
        {/* Hotel Recommendations */}
        <Box sx={{ mb: 6 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              color: 'white', 
              fontWeight: 600, 
              mb: 4,
              fontSize: '2rem'
            }}
          >
            Hotel Recommendation
          </Typography>

          {/* Paris Description Card */}
          

          <Grid container spacing={3}>
            {tripData?.hotels?.map((hotel, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card
                  sx={{
                    background: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
                    borderRadius: '20px',
                    p: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    border: 'none',
                    minHeight: '180px',
                    height: 'auto',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 30px rgba(236, 72, 153, 0.3)'
                    }
                  }
                }>
                  <CardContent sx={{ textAlign: 'center', width: '100%' }}>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                      {hotel.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 1 }}>
                      {hotel.description}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 500 }}>
                      {hotel.priceRange}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Your Itinerary */}
        <Box>
          <Typography 
            variant="h4" 
            sx={{ 
              color: 'white', 
              fontWeight: 600, 
              mb: 4,
              fontSize: { xs: '1.5rem', md: '2rem' }
            }}
          >
            Your Itinerary
          </Typography>
          
          {tripData?.itinerary?.map((day, dayIndex) => (
            <Box key={dayIndex} sx={{ mb: 6 }}>
              <Typography 
                variant="h5" 
                sx={{ 
                  color: 'white', 
                  fontWeight: 600, 
                  mb: 3,
                  fontSize: { xs: '1.3rem', md: '1.5rem' }
                }}
              >
                Day {day.day}
              </Typography>
              
              <Grid container spacing={3}>
                {day.activities?.map((activity, activityIndex) => (
                  <Grid item xs={12} md={6} key={activityIndex}>
                    <Card
                      sx={{
                        backgroundColor: 'rgba(30, 41, 59, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '20px',
                        p: 3,
                        display: 'flex',
                        gap: 2,
                        minHeight: '180px',
                        height: 'auto',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(30, 41, 59, 0.9)',
                          transform: 'translateY(-2px)',
                          border: '1px solid rgba(255, 255, 255, 0.2)'
                        }
                      }}
                    >
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: '16px',
                          background: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
                          flexShrink: 0
                        }
                      }
                      />
                      <Box sx={{ flex: 1, overflow: 'hidden' }}>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: '#EC4899', 
                            mb: 1,
                            fontSize: '0.9rem',
                            fontWeight: 500
                          }}
                        >
                          {activity.time}
                        </Typography>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            color: 'white', 
                            fontWeight: 600, 
                            mb: 2,
                            fontSize: '1.1rem',
                            lineHeight: 1.3
                          }}
                        >
                          {activity.name}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'rgba(255, 255, 255, 0.7)', 
                            mb: 2,
                            fontSize: '0.9rem',
                            lineHeight: 1.6
                          }}
                        >
                          {activity.description}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AccessTime sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.9rem' }} />
                            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.85rem' }}>
                              {activity.duration}
                            </Typography>
                          </Box>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: activity.cost === 'Free' ? '#22C55E' : '#8B5CF6',
                              fontWeight: 600,
                              fontSize: '0.85rem'
                            }}
                          >
                            {activity.cost}
                          </Typography>
                        </Box>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default TripResults;
