import React from 'react';
import {
    AppBar,
    Toolbar,
    Box,
    Typography,
    Button
} from '@mui/material';
import { FlightTakeoff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const Header = () => {
    const navigate = useNavigate();
    const theme = useTheme();

    const handleCreateTrip = () => {
        navigate('/preferences');
    };

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

                {/* Create Trip Button */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                        variant="contained"
                        onClick={handleCreateTrip}
                        sx={{
                            background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
                            color: 'white',
                            textTransform: 'none',
                            px: 3,
                            py: 1,
                            fontSize: '1rem',
                            fontWeight: 500,
                            borderRadius: '20px',
                            '&:hover': {
                                background: 'linear-gradient(45deg, #7C3AED, #DB2777)',
                            }
                        }}
                    >
                        Create Trip
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
