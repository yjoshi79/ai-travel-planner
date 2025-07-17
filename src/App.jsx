import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './components/Home';
import TravelPreferences from './components/TravelPreferences';
import TripResults from './components/TripResults';
import ProtectedRoute from './components/ProtectedRoute';

// Create a dark theme with purple accents
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8B5CF6', // Purple
      light: '#A855F7',
      dark: '#7C3AED',
    },
    secondary: {
      main: '#EC4899', // Pink
    },
    background: {
      default: '#0F172A', // Dark slate
      paper: '#1E293B',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    body1: {
      fontSize: '1.1rem',
      lineHeight: 1.6,
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Box sx={{ position: 'relative', minHeight: '100vh' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route 
                path="/preferences" 
                element={
                  <ProtectedRoute>
                    <TravelPreferences />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/results" 
                element={
                  <ProtectedRoute>
                    <TripResults />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </Box>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App
