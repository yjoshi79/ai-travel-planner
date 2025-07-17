import React, { useState } from 'react';
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
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

const Header = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const { isAuthenticated, user, logout, getUserDisplayName, getUserAvatar } = useAuth();
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [userMenuAnchor, setUserMenuAnchor] = useState(null);

    const handleCreateTrip = () => {
        if (isAuthenticated()) {
            navigate('/preferences');
        } else {
            setAuthModalOpen(true);
        }
    };

    const handleAuthSuccess = () => {
        navigate('/preferences');
    };

    const handleUserMenuOpen = (event) => {
        setUserMenuAnchor(event.currentTarget);
    };

    const handleUserMenuClose = () => {
        setUserMenuAnchor(null);
    };

    const handleLogout = () => {
        logout();
        handleUserMenuClose();
        navigate('/');
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

                {/* Right Buttons */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Button
                        startIcon={<Add />}
                        onClick={handleCreateTrip}
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
                    {isAuthenticated() ? (
                        <Box
                            onClick={handleUserMenuOpen}
                            sx={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                position: 'relative',
                            }}
                        >
                            {user?.avatar ? (
                                <img 
                                    src={getUserAvatar()} 
                                    alt={getUserDisplayName()}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '50%',
                                        objectFit: 'cover'
                                    }}
                                />
                            ) : (
                                <Typography sx={{ color: 'white', fontSize: '1rem', fontWeight: 600 }}>
                                    {getUserDisplayName()?.charAt(0)?.toUpperCase() || 'U'}
                                </Typography>
                            )}
                        </Box>
                    ) : (
                        <Button
                            onClick={() => setAuthModalOpen(true)}
                            sx={{
                                color: 'white',
                                textTransform: 'none',
                                fontSize: '1rem',
                                fontWeight: 500,
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                borderRadius: '20px',
                                px: 3,
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    borderColor: 'rgba(255, 255, 255, 0.5)',
                                },
                            }}
                        >
                            Sign In
                        </Button>
                    )}

                    {/* User Menu */}
                    {isAuthenticated() && (
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '100%',
                                right: 0,
                                mt: 1,
                                minWidth: 200,
                                backgroundColor: theme.palette.background.paper,
                                borderRadius: 2,
                                boxShadow: 3,
                                py: 1,
                                display: userMenuAnchor ? 'block' : 'none',
                                zIndex: 1000,
                            }}
                            onMouseLeave={handleUserMenuClose}
                        >
                            <Box sx={{ px: 2, py: 1, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                                <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 600 }}>
                                    {getUserDisplayName()}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                    {user?.email}
                                </Typography>
                            </Box>
                            <Button
                                fullWidth
                                onClick={handleLogout}
                                sx={{
                                    color: 'white',
                                    textTransform: 'none',
                                    justifyContent: 'flex-start',
                                    px: 2,
                                    py: 1,
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    },
                                }}
                            >
                                Sign Out
                            </Button>
                        </Box>
                    )}
                </Box>

                {/* Auth Modal */}
                <AuthModal
                    open={authModalOpen}
                    onClose={() => setAuthModalOpen(false)}
                    onSuccess={handleAuthSuccess}
                />
            </Toolbar>
        </AppBar>
    );
};

export default Header;
