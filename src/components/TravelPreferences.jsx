import { 
  Box, 
  Typography, 
  Button, 
  AppBar, 
  Toolbar, 
  Container,
  useTheme,
  TextField,
  MenuItem,
  Card,
  CardContent,
  Grid,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import { 
  FlightTakeoff, 
  Add, 
  Person, 
  LocationOn,
  CalendarToday,
  AttachMoney,
  Group,
  AccountCircle,
  Favorite,
  Home,
  Groups
} from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TravelPreferences = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    destination: '',
    duration: '',
    budget: '',
    travelers: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenerateTrip = () => {
    // Handle trip generation logic here
    console.log('Generating trip with:', formData);
  };

  const budgetOptions = [
    {
      id: 'cheap',
      title: 'Cheap',
      description: 'Stay conscious of costs',
      icon: '💵',
      color: '#22C55E'
    },
    {
      id: 'moderate',
      title: 'Moderate',
      description: 'Keep cost on the average side',
      icon: '💰',
      color: '#F59E0B'
    },
    {
      id: 'luxury',
      title: 'Luxury',
      description: "Don't worry about cost",
      icon: '💎',
      color: '#3B82F6'
    }
  ];

  const travelerOptions = [
    {
      id: 'solo',
      title: 'Just Me',
      description: 'A sole traveler in exploration',
      icon: '✈️',
      color: '#8B5CF6'
    },
    {
      id: 'couple',
      title: 'A Couple',
      description: 'Two travelers in tandem',
      icon: '👫',
      color: '#EC4899'
    },
    {
      id: 'family',
      title: 'Family',
      description: 'A group of fun loving adventure',
      icon: '🏠',
      color: '#F59E0B'
    },
    {
      id: 'friends',
      title: 'Friends',
      description: 'A bunch of thrill-seekers',
      icon: '🛥️',
      color: '#10B981'
    }
  ];

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
      {/* Decorative circles */}
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          left: '5%',
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
          opacity: 0.3,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          right: '8%',
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #EC4899, #8B5CF6)',
          opacity: 0.3,
        }}
      />

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
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h1"
            sx={{
              color: 'white',
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 600,
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2
            }}
          >
            Tell us your travel preferences 🏔️ 🌴
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '1.1rem',
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
          </Typography>
        </Box>

        {/* Form Section */}
        <Box sx={{ mb: 4 }}>
          {/* Destination */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <LocationOn sx={{ color: 'white', fontSize: '1.5rem' }} />
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                What is destination of choice?
              </Typography>
            </Box>
            <FormControl fullWidth>
              <Select
                value={formData.destination}
                onChange={(e) => handleInputChange('destination', e.target.value)}
                displayEmpty
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.primary.main,
                  },
                  '& .MuiSelect-icon': {
                    color: 'white',
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: '#1E293B',
                      color: 'white',
                    },
                  },
                }}
              >
                <MenuItem value="" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  Select...
                </MenuItem>
                <MenuItem value="paris">Paris, France</MenuItem>
                <MenuItem value="tokyo">Tokyo, Japan</MenuItem>
                <MenuItem value="new-york">New York, USA</MenuItem>
                <MenuItem value="london">London, UK</MenuItem>
                <MenuItem value="bali">Bali, Indonesia</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Duration */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <CalendarToday sx={{ color: 'white', fontSize: '1.5rem' }} />
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                How many days are you planning your trip?
              </Typography>
            </Box>
            <TextField
              fullWidth
              placeholder="Ex. 3"
              value={formData.duration}
              onChange={(e) => handleInputChange('duration', e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'rgba(255, 255, 255, 0.5)',
                },
              }}
            />
          </Box>

          {/* Budget */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <AttachMoney sx={{ color: 'white', fontSize: '1.5rem' }} />
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                What is Your Budget?
              </Typography>
            </Box>
            <Grid container spacing={2}>
              {budgetOptions.map((option) => (
                <Grid item xs={12} md={4} key={option.id}>
                  <Card
                    sx={{
                      backgroundColor: formData.budget === option.id ? 'rgba(139, 92, 246, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                      border: formData.budget === option.id ? '2px solid #8B5CF6' : '1px solid rgba(255, 255, 255, 0.2)',
                      cursor: 'pointer',
                      textAlign: 'center',
                      py: 3,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(139, 92, 246, 0.2)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                    onClick={() => handleInputChange('budget', option.id)}
                  >
                    <CardContent sx={{ py: 2 }}>
                      <Typography sx={{ fontSize: '2rem', mb: 1 }}>
                        {option.icon}
                      </Typography>
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                        {option.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                        {option.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Travelers */}
          <Box sx={{ mb: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <Group sx={{ color: 'white', fontSize: '1.5rem' }} />
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                Who do you plan on traveling with on your next adventure?
              </Typography>
            </Box>
            <Grid container spacing={2}>
              {travelerOptions.map((option) => (
                <Grid item xs={12} sm={6} md={3} key={option.id}>
                  <Card
                    sx={{
                      backgroundColor: formData.travelers === option.id ? 'rgba(139, 92, 246, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                      border: formData.travelers === option.id ? '2px solid #8B5CF6' : '1px solid rgba(255, 255, 255, 0.2)',
                      cursor: 'pointer',
                      textAlign: 'center',
                      py: 3,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(139, 92, 246, 0.2)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                    onClick={() => handleInputChange('travelers', option.id)}
                  >
                    <CardContent sx={{ py: 2 }}>
                      <Typography sx={{ fontSize: '2rem', mb: 1 }}>
                        {option.icon}
                      </Typography>
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                        {option.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                        {option.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Generate Button */}
          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleGenerateTrip}
              sx={{
                background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
                color: 'white',
                px: 6,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: '50px',
                boxShadow: '0 8px 32px rgba(139, 92, 246, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #7C3AED, #DB2777)',
                  boxShadow: '0 12px 40px rgba(139, 92, 246, 0.4)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Generate Trip
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default TravelPreferences;
