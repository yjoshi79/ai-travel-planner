import { 
  Box, 
  Typography, 
  Button, 
  AppBar, 
  Toolbar, 
  Container,
  useTheme,
  Paper
} from '@mui/material';
import { FlightTakeoff, Add, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/preferences');
  };

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
                fontSize: '1.5rem'
              }}
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
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box 
          sx={{ 
            textAlign: 'center',
            mb: 8,
            pt: 4
          }}
        >
          <Typography
            variant="h1"
            sx={{
              background: 'linear-gradient(45deg, #FFFFFF 30%, #8B5CF6 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              mb: 3,
              fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            Discover Your Next Adventure with{' '}
            <span
              style={{
                background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              AI
            </span>
            :{' '}
            <br />
            Personalized Itineraries at Your Fingertips
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              mb: 4,
              fontSize: '1.2rem',
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
          </Typography>

          <Button
            variant="contained"
            size="large"
            startIcon={<FlightTakeoff sx={{ transform: 'rotate(-45deg)' }} />}
            onClick={handleGetStarted}
            sx={{
              background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
              color: 'white',
              px: 4,
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
            Get Started, It's Free
          </Button>
        </Box>

        {/* Interactive Preview Section */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <Paper
            elevation={0}
            sx={{
              width: { xs: '90%', md: '70%', lg: '60%' },
              height: '400px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
              }}
            >
              <FlightTakeoff
                sx={{
                  fontSize: '4rem',
                  color: 'rgba(0, 0, 0, 0.8)',
                  mb: 2,
                  transform: 'rotate(-45deg)',
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  color: 'rgba(0, 0, 0, 0.8)',
                  fontWeight: 600,
                  fontSize: '1.2rem',
                }}
              >
                Interactive Trip Planning Preview
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
