import { 
  Box, 
  Typography, 
  Button, 
  AppBar, 
  Toolbar, 
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
  FlightTakeoff, 
  Add, 
  Person, 
  LocationOn,
  CalendarToday,
  AttachMoney,
  Group,
  AccessTime,
  Send,
  Schedule
} from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import travelAIService from '../services/travelAIService';

const TripResults = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get user preferences from navigation state
  const userPreferences = location.state?.preferences || {};

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
      const mockData = travelAIService.generateMockData(userPreferences);
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
      {/* Navigation Bar */}
      <AppBar 
        position="static" 
        elevation={0}
        sx={{
          backgroundColor: 'transparent',
          borderBottom: 'none',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FlightTakeoff 
              sx={{ 
                color: theme.palette.primary.main, 
                fontSize: '2rem',
                transform: 'rotate(-45deg)'
              }} 
            />
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'bold', 
                color: 'white',
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}
              onClick={() => navigate('/')}
            >
              TravelAI
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Button
              startIcon={<Add />}
              sx={{
                color: 'white',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }
              }}
            >
              Create Trip
            </Button>
            <Button
              sx={{
                color: 'white',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }
              }}
            >
              My Trips
            </Button>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <Person sx={{ color: 'white', fontSize: '1.2rem' }} />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Trip Summary Header */}
        <Paper
          elevation={0}
          sx={{
            background: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
            borderRadius: '20px',
            p: 4,
            mb: 4,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
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
              {tripData?.destination || 'Tokyo'}
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

        {/* Hotel Recommendations */}
        <Box sx={{ mb: 6 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              color: 'white', 
              fontWeight: 600, 
              mb: 4,
              fontSize: { xs: '1.5rem', md: '2rem' }
            }}
          >
            Hotel Recommendation
          </Typography>
          <Grid container spacing={3}>
            {tripData?.hotels?.map((hotel, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    background: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
                    borderRadius: '20px',
                    height: '180px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: 'none',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 30px rgba(236, 72, 153, 0.3)',
                    }
                  }}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
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
                        height: '100%',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(30, 41, 59, 0.9)',
                          transform: 'translateY(-2px)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                        }
                      }}
                    >
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: '16px',
                          background: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
                          flexShrink: 0,
                        }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'rgba(255, 255, 255, 0.8)', 
                            mb: 1,
                            fontSize: '0.9rem'
                          }}
                        >
                          {activity.time}
                        </Typography>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            color: 'white', 
                            fontWeight: 600, 
                            mb: 1,
                            fontSize: '1.1rem',
                            lineHeight: 1.3
                          }}
                        >
                          {activity.name}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'rgba(255, 255, 255, 0.8)', 
                            mb: 2,
                            fontSize: '0.9rem',
                            lineHeight: 1.4
                          }}
                        >
                          {activity.description}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', flexWrap: 'wrap' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <AccessTime sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '1rem' }} />
                            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.85rem' }}>
                              {activity.duration}
                            </Typography>
                          </Box>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: activity.cost === 'Free' ? '#22C55E' : '#8B5CF6',
                              fontWeight: 600,
                              fontSize: '0.9rem'
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
