import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import FloatingOrbs from './FloatingOrbs';
import { 
  Box, 
  Typography, 
  Button, 
  Container,
  useTheme,
  TextField,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import { 
  FlightTakeoff, 
  LocationOn,
  CalendarToday,
  AttachMoney,
  Group
} from '@mui/icons-material';

// Data for the selectable cards
const budgetOptions = [
  { id: 'cheap', icon: '💵', title: 'Budget', description: 'Mindful spending' },
  { id: 'moderate', icon: '💰', title: 'Moderate', description: 'Comfort and value' },
  { id: 'luxury', icon: '💎', title: 'Luxury', description: 'No constraints' },
];

const travelerOptions = [
  { id: 'solo', icon: '✈️', title: 'Solo', description: 'Just me' },
  { id: 'couple', icon: '👫', title: 'Couple', description: 'Two travelers' },
  { id: 'family', icon: '🏠', title: 'Family', description: 'A family group' },
  { id: 'friends', icon: '🛥️', title: 'Friends', description: 'Group of friends' },
];

const TravelPreferences = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // State for all form fields
  const [preferences, setPreferences] = useState({
    destination: '',
    duration: '',
    budget: '',
    travelers: ''
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

  // Handler for text fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setPreferences(prev => ({ ...prev, [name]: value }));
  };
  
  // Handler for card selections
  const handleCardSelect = (name, value) => {
    setPreferences(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Simple validation
    const newErrors = {};
    if (!preferences.destination) newErrors.destination = 'Destination is required';
    if (!preferences.duration) newErrors.duration = 'Duration is required';
    if (!preferences.budget) newErrors.budget = 'Budget is required';
    if (!preferences.travelers) newErrors.travelers = 'Number of travelers is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    
    // Navigate to results page with user preferences
    navigate('/results', {
      state: { preferences }
    });
  };

  const commonTextFieldSx = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
      '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
      '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
    },
    '& .MuiInputBase-input::placeholder': { color: 'rgba(255, 255, 255, 0.5)' },
    '& .MuiFormHelperText-root': { color: theme.palette.error.main, marginLeft: 0 }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, #1E293B 25%, #334155 50%, #475569 75%, #64748B 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <FloatingOrbs />
      <Header />
      
      <Container maxWidth="md" sx={{ py: 4, position: 'relative', zIndex: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              color: 'white', fontWeight: 700, mb: 2,
              fontSize: { xs: '2rem', md: '3rem' }
            }}
          >
            Plan Your Perfect Trip
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: { xs: '1rem', md: '1.25rem' }
            }}
          >
            Tell us your preferences and we'll create a personalized itinerary
          </Typography>
        </Box>

        <Card
          sx={{
            background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)',
            borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.2)',
            p: { xs: 2, sm: 4 }
          }}
        >
          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={4}>
              
              {/* Destination & Duration */}
              <Grid item xs={12} sm={8}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <LocationOn sx={{ color: 'white' }} />
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                    Where do you want to go?
                  </Typography>
                </Box>
                <TextField
                  name="destination"
                  fullWidth
                  placeholder="Ex. Paris, Tokyo, New York"
                  value={preferences.destination}
                  onChange={handleChange}
                  error={!!errors.destination}
                  helperText={errors.destination}
                  sx={commonTextFieldSx}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <CalendarToday sx={{ color: 'white' }} />
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                    Duration
                  </Typography>
                </Box>
                <TextField
                  name="duration"
                  type="number"
                  fullWidth
                  placeholder="Ex. 7 days"
                  value={preferences.duration}
                  onChange={handleChange}
                  inputProps={{ min: 1, max: 30 }}
                  error={!!errors.duration}
                  helperText={errors.duration}
                  sx={commonTextFieldSx}
                />
              </Grid>

              {/* Budget */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <AttachMoney sx={{ color: 'white' }} />
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                    What's Your Budget?
                  </Typography>
                </Box>
                 {errors.budget && <Typography variant="caption" sx={{ color: theme.palette.error.main }}>{errors.budget}</Typography>}
                <Grid container spacing={2}>
                  {budgetOptions.map((option) => (
                    <Grid item xs={12} sm={4} key={option.id}>
                      <Card
                        onClick={() => handleCardSelect('budget', option.id)}
                        sx={{
                          backgroundColor: preferences.budget === option.id ? 'rgba(139, 92, 246, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                          border: preferences.budget === option.id ? '2px solid #8B5CF6' : '1px solid rgba(255, 255, 255, 0.2)',
                          cursor: 'pointer', textAlign: 'center', height: '100%',
                          transition: 'all 0.3s ease',
                          '&:hover': { backgroundColor: 'rgba(139, 92, 246, 0.2)', transform: 'translateY(-4px)' },
                        }}
                      >
                        <CardContent>
                          <Typography sx={{ fontSize: '2rem' }}>{option.icon}</Typography>
                          <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>{option.title}</Typography>
                          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>{option.description}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              
              {/* Travelers */}
              <Grid item xs={12}>
                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Group sx={{ color: 'white' }} />
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                    Who's traveling?
                  </Typography>
                </Box>
                 {errors.travelers && <Typography variant="caption" sx={{ color: theme.palette.error.main }}>{errors.travelers}</Typography>}
                <Grid container spacing={2}>
                  {travelerOptions.map((option) => (
                    <Grid item xs={6} sm={3} key={option.id}>
                       <Card
                        onClick={() => handleCardSelect('travelers', option.id)}
                        sx={{
                          backgroundColor: preferences.travelers === option.id ? 'rgba(139, 92, 246, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                          border: preferences.travelers === option.id ? '2px solid #8B5CF6' : '1px solid rgba(255, 255, 255, 0.2)',
                          cursor: 'pointer', textAlign: 'center', height: '100%',
                          transition: 'all 0.3s ease',
                          '&:hover': { backgroundColor: 'rgba(139, 92, 246, 0.2)', transform: 'translateY(-4px)' },
                        }}
                      >
                        <CardContent>
                          <Typography sx={{ fontSize: '2rem' }}>{option.icon}</Typography>
                          <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>{option.title}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
                    borderRadius: '12px', py: 2, fontSize: '1.1rem',
                    fontWeight: 600, textTransform: 'none',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #7C3AED, #DB2777)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <FlightTakeoff sx={{ mr: 1 }} />
                  Generate My Trip
                </Button>
              </Grid>

            </Grid>
          </form>
        </Card>
      </Container>
    </Box>
  );
};

export default TravelPreferences;