import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Alert,
  CircularProgress,
  Divider
} from '@mui/material';
import { Close, Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../contexts/AuthContext';

const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
});

const signupSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required')
});

const AuthModal = ({ open, onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, signup } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(isLogin ? loginSchema : signupSchema)
  });

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    reset();
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');

    try {
      let result;
      if (isLogin) {
        result = await login(data.email, data.password);
      } else {
        result = await signup(data.name, data.email, data.password);
      }

      if (result.success) {
        // Handle signup confirmation message
        if (!isLogin && result.message) {
          setError(result.message); // Show confirmation message in modal
          setLoading(false);
          return;
        }
        
        onSuccess();
        onClose();
        reset();
      } else {
        // Handle specific error messages
        if (result.error && result.error.includes('Email not confirmed')) {
          setError('Your email is not confirmed. Please check your inbox for a verification link.');
        } else {
          setError(result.error || 'Authentication failed');
        }
      }
    } catch (err) {
      console.error('Auth error:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setError('');
    reset();
    setIsLogin(true);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ position: 'relative', p: 4 }}>
          {/* Close Button */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 16,
              top: 16,
              color: 'rgba(255, 255, 255, 0.7)',
              '&:hover': {
                color: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <Close />
          </IconButton>

          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h4"
              sx={{
                color: 'white',
                fontWeight: 700,
                mb: 1,
                background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }}
            >
              {isLogin ? 'Welcome Back!' : 'Join TravelAI'}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
            >
              {isLogin 
                ? 'Sign in to continue your travel planning journey' 
                : 'Create an account to start planning amazing trips'
              }
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert 
              severity={error.includes('check your email') || error.includes('confirmation') ? "info" : "error"}
              sx={{ 
                mb: 3,
                backgroundColor: error.includes('check your email') || error.includes('confirmation') 
                  ? 'rgba(33, 150, 243, 0.1)' 
                  : 'rgba(244, 67, 54, 0.1)',
                color: error.includes('check your email') || error.includes('confirmation') 
                  ? '#2196f3' 
                  : '#f44336',
                '& .MuiAlert-icon': {
                  color: error.includes('check your email') || error.includes('confirmation') 
                    ? '#2196f3' 
                    : '#f44336'
                }
              }}
            >
              {error}
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Name Field (Signup only) */}
              {!isLogin && (
                <TextField
                  {...register('name')}
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: 'white',
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#8B5CF6',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'rgba(255, 255, 255, 0.7)',
                      '&.Mui-focused': {
                        color: '#8B5CF6',
                      },
                    },
                    '& .MuiFormHelperText-root': {
                      color: '#f44336',
                    },
                  }}
                />
              )}

              {/* Email Field */}
              <TextField
                {...register('email')}
                label="Email Address"
                type="email"
                variant="outlined"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#8B5CF6',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                    '&.Mui-focused': {
                      color: '#8B5CF6',
                    },
                  },
                  '& .MuiFormHelperText-root': {
                    color: '#f44336',
                  },
                }}
              />

              {/* Password Field */}
              <TextField
                {...register('password')}
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#8B5CF6',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                    '&.Mui-focused': {
                      color: '#8B5CF6',
                    },
                  },
                  '& .MuiFormHelperText-root': {
                    color: '#f44336',
                  },
                }}
              />

              {/* Confirm Password Field (Signup only) */}
              {!isLogin && (
                <TextField
                  {...register('confirmPassword')}
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  variant="outlined"
                  fullWidth
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: 'white',
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#8B5CF6',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'rgba(255, 255, 255, 0.7)',
                      '&.Mui-focused': {
                        color: '#8B5CF6',
                      },
                    },
                    '& .MuiFormHelperText-root': {
                      color: '#f44336',
                    },
                  }}
                />
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                  background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
                  color: 'white',
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 8px 32px rgba(139, 92, 246, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #7C3AED, #DB2777)',
                    boxShadow: '0 12px 40px rgba(139, 92, 246, 0.4)',
                  },
                  '&:disabled': {
                    background: 'rgba(139, 92, 246, 0.5)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: 'white' }} />
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </Button>
            </Box>
          </form>

          {/* Toggle Mode */}
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Divider sx={{ mb: 3, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </Typography>
            <Button
              onClick={handleToggleMode}
              sx={{
                color: '#8B5CF6',
                textTransform: 'none',
                fontWeight: 600,
                mt: 1,
                '&:hover': {
                  backgroundColor: 'rgba(139, 92, 246, 0.1)',
                }
              }}
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;