import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { keyframes } from '@mui/system';

// Keyframes

const starRise = keyframes`
  0% {
    transform: translateY(100vh) scale(0);
    opacity: 0;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(-100vh) scale(1);
    opacity: 0;
  }
`;

const twinkle = keyframes`
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 0.8;
  }
`;

const orbFloat = keyframes`
  0% {
    transform: translateY(0px) translateX(0px) scale(1);
  }
  33% {
    transform: translateY(-30px) translateX(20px) scale(1.1);
  }
  66% {
    transform: translateY(10px) translateX(-15px) scale(0.9);
  }
  100% {
    transform: translateY(0px) translateX(0px) scale(1);
  }
`;

const FloatingOrbs = () => {
    const stars = useMemo(() => {
        return Array.from({ length: 80 }).map((_, index) => ({
            id: index,
            left: `${Math.random() * 100}%`,
            size: 3,
            delay: Math.random() * 0.5,
            duration: Math.random() * 3 + 4,
        }));
    }, []);

    return (
        <>
            {/* Stars */}
            {stars.map((star) => (
                <Box
                    key={star.id}
                    sx={{
                        position: 'fixed',
                        left: star.left,
                        bottom: '-5px',
                        width: star.size,
                        height: star.size,
                        background: 'white',
                        borderRadius: '50%',
                        animation: `${starRise} ${star.duration}s ${star.delay}s infinite linear, ${twinkle} 1s ease-in-out infinite`,
                        opacity: 0.6,
                        boxShadow: '0 0 3px rgba(255, 255, 255, 0.5)',
                        zIndex: 0,
                    }}
                />
            ))}

            {/* Orbs */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '15%',
                    left: '5%',
                    width: 180,
                    height: 180,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0.05) 70%, transparent 100%)',
                    animation: `${orbFloat} 18s ease-in-out infinite`,
                    filter: 'blur(2px)',
                    zIndex: 0,
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '20%',
                    right: '8%',
                    width: 200,
                    height: 200,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, rgba(236, 72, 153, 0.05) 70%, transparent 100%)',
                    animation: `${orbFloat} 20s ease-in-out infinite reverse`,
                    filter: 'blur(2px)',
                    zIndex: 0,
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    right: '15%',
                    width: 150,
                    height: 150,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, rgba(168, 85, 247, 0.05) 60%, transparent 100%)',
                    animation: `${orbFloat} 15s ease-in-out infinite`,
                    filter: 'blur(1.5px)',
                    zIndex: 0,
                }}
            />
        </>
    );
};

export default FloatingOrbs;
