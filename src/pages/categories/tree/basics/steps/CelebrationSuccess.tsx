import React from "react";
import { Box, Typography, Button, Fade, Zoom, keyframes } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StarIcon from '@mui/icons-material/Star';
import RefreshIcon from '@mui/icons-material/Refresh';
import { StepProps, Step } from "./types";

// Keyframe animations
const confettiAnimation = keyframes`
  0% {
    transform: translateY(-100vh) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
`;

const bounceIn = keyframes`
  0% {
    transform: scale(0.3);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const ConfettiPiece = ({ delay, color, left }: { delay: number; color: string; left: string }) => (
  <Box
    sx={{
      position: 'absolute',
      left: left,
      top: '-10px',
      width: '10px',
      height: '10px',
      backgroundColor: color,
      animation: `${confettiAnimation} 3s linear infinite`,
      animationDelay: `${delay}s`,
    }}
  />
);

const CelebrationSuccess = ({ setStep, containerRef, canvasRef, setShowStepsIndicator }: StepProps) => {
  const [showConfetti, setShowConfetti] = React.useState(false);

  React.useEffect(() => {
    setShowConfetti(true);
  }, []);

  const handleRestart = () => {
    setStep(Step.FIND_ROOT);
  };

  const handleContinue = () => {
    // You can navigate to a different page or close the modal
    window.location.href = '/categories/tree';
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
        overflow: 'hidden',
        flex: 1,
      }}
    >
      {/* Confetti Animation */}
      {showConfetti && (
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', pointerEvents: 'none' }}>
          {Array.from({ length: 50 }).map((_, i) => (
            <ConfettiPiece
              key={i}
              delay={i * 0.1}
              color={['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'][i % 6]}
              left={`${Math.random() * 100}%`}
            />
          ))}
        </Box>
      )}

      {/* Main Content */}
      <Fade in timeout={1000}>
        <Box
          sx={{
            textAlign: 'center',
            zIndex: 2,
            position: 'relative',
          }}
        >
          {/* Trophy Icon with Animation */}
          <Box
            sx={{
              animation: `${bounceIn} 1s ease-out, ${float} 3s ease-in-out infinite 1s`,
              mb: 4,
            }}
          >
            <EmojiEventsIcon
              sx={{
                fontSize: 120,
                color: '#FFD700',
                filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.5))',
              }}
            />
          </Box>

          {/* Success Message */}
          <Zoom in timeout={1500}>
            <Typography
              variant="h2"
              sx={{
                color: 'white',
                fontWeight: 700,
                mb: 2,
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
              }}
            >
              🎉 Congratulations! 🎉
            </Typography>
          </Zoom>

          <Fade in timeout={2000}>
            <Typography
              variant="h4"
              sx={{
                color: 'white',
                fontWeight: 600,
                mb: 4,
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                fontSize: { xs: '1.5rem', md: '2rem' },
                animation: `${bounceIn} 1s ease-out 0.5s both`,
              }}
            >
              You've Mastered Tree Basics!
            </Typography>
          </Fade>

          <Fade in timeout={2500}>
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                mb: 6,
                lineHeight: 1.6,
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
              }}
            >
              You've successfully completed all tree basics:
              <br />
              <strong>Root, Leaves, Parent, Children, Height, and Traversals</strong>
              <br />
              <br />
              You now understand the fundamental concepts of binary trees!
            </Typography>
          </Fade>

          {/* Action Buttons */}
          <Fade in timeout={3000}>
            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleRestart}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: '2px solid white',
                  px: 4,
                  py: 2,
                  borderRadius: 3,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  backdropFilter: 'blur(10px)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <RefreshIcon sx={{ mr: 1 }} />
                Try Again
              </Button>

              <Button
                variant="contained"
                size="large"
                onClick={handleContinue}
                sx={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  px: 4,
                  py: 2,
                  borderRadius: 3,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  animation: `${pulse} 2s ease-in-out infinite`,
                  '&:hover': {
                    backgroundColor: '#45A049',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(76, 175, 80, 0.4)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                ✨ Continue Learning
              </Button>
            </Box>
          </Fade>

          {/* Achievement Badges */}
          <Fade in timeout={3500}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3,
                mt: 6,
              }}
            >
              {/* Row 1: Basic Concepts */}
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
                {[
                  { icon: <CheckCircleIcon sx={{ fontSize: 40, color: '#4CAF50' }} />, text: 'Root Master' },
                  { icon: <CheckCircleIcon sx={{ fontSize: 40, color: '#2196F3' }} />, text: 'Leaves Expert' },
                  { icon: <CheckCircleIcon sx={{ fontSize: 40, color: '#FF9800' }} />, text: 'Parent Pro' },
                  { icon: <CheckCircleIcon sx={{ fontSize: 40, color: '#2196F3' }} />, text: 'Children Expert' },
                ].map((badge, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      p: 2,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: 2,
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      minWidth: '120px',
                      animation: `${bounceIn} ${1 + index * 0.2}s ease-out`,
                    }}
                  >
                    {badge.icon}
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'white',
                        fontWeight: 600,
                        mt: 1,
                        textAlign: 'center',
                      }}
                    >
                      {badge.text}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Row 2: Advanced Concepts */}
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
                {[
                  { icon: <CheckCircleIcon sx={{ fontSize: 40, color: '#FF9800' }} />, text: 'Height Pro' },
                  { icon: <CheckCircleIcon sx={{ fontSize: 40, color: '#4CAF50' }} />, text: 'Preorder Master' },
                  { icon: <CheckCircleIcon sx={{ fontSize: 40, color: '#2196F3' }} />, text: 'Inorder Expert' },
                  { icon: <CheckCircleIcon sx={{ fontSize: 40, color: '#FF9800' }} />, text: 'Postorder Pro' },
                ].map((badge, index) => (
                  <Box
                    key={index + 4}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      p: 2,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: 2,
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      minWidth: '120px',
                      animation: `${bounceIn} ${1.8 + index * 0.2}s ease-out`,
                    }}
                  >
                    {badge.icon}
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'white',
                        fontWeight: 600,
                        mt: 1,
                        textAlign: 'center',
                      }}
                    >
                      {badge.text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Fade>
        </Box>
      </Fade>

      {/* Floating Stars */}
      {Array.from({ length: 20 }).map((_, i) => (
        <StarIcon
          key={i}
          sx={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: 20,
            color: 'rgba(255, 255, 255, 0.6)',
            animation: `${float} ${3 + Math.random() * 2}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
            pointerEvents: 'none',
          }}
        />
      ))}
    </Box>
  );
};

export default CelebrationSuccess;
