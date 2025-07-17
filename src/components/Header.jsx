import React from 'react';
import {
    AppBar,
    Toolbar,
    Box,
    Typography,
    Button
} from '@mui/material';
import { FlightTakeoff, Add, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const Header = () => {
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                backgroundColor: 'transparent',
                borderBottom: 'none',
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between', py: 2 }}>
                {/* Left Logo */}
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

                {/* Right Buttons */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Button
                        startIcon={<Add />}
                        onClick={() => {
                            console.log('Navigating to preferences...');
                            navigate('/preferences', { replace: true });
                        }}
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
    );
};

export default Header;
