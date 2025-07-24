import React, { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  Slider,
  Typography,
  Paper,
  Stack,
  Chip,
  Tooltip,
  useTheme
} from '@mui/material';

import * as PlayArrow from '@mui/icons-material/PlayArrow';
import * as Pause from '@mui/icons-material/Pause';
import * as SkipPrevious from '@mui/icons-material/SkipPrevious';
import * as SkipNext from '@mui/icons-material/SkipNext';
import * as RestartAlt from '@mui/icons-material/RestartAlt';
import * as Speed from '@mui/icons-material/Speed';
import * as Visibility from '@mui/icons-material/Visibility';
import * as VisibilityOff from '@mui/icons-material/VisibilityOff';


const PlayIcon = PlayArrow.default as unknown as React.ElementType;
const PauseIcon = Pause.default as unknown as React.ElementType;
const PrevIcon = SkipPrevious.default as unknown as React.ElementType;
const NextIcon = SkipNext.default as unknown as React.ElementType;
const RestartIcon = RestartAlt.default as unknown as React.ElementType;
const SpeedIcon = Speed.default as unknown as React.ElementType;
const VisibilityIcon = Visibility.default as unknown as React.ElementType;
const VisibilityOffIcon = VisibilityOff.default as unknown as React.ElementType;

interface TimelinePlayerProps {
  timeline: any; // GSAP Timeline
  labels?: string[];
  onStepChange?: (step: number) => void;
  showProgress?: boolean;
  showSpeed?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export default function TimelinePlayer({
  timeline,
  labels = [],
  onStepChange,
  showProgress = true,
  showSpeed = false,
  size = 'medium'
}: TimelinePlayerProps) {
  const theme = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [showProgressBar, setShowProgressBar] = useState(showProgress);

  // Update progress when timeline changes
  useEffect(() => {
    if (!timeline) return;

    const updateProgress = () => {
      setProgress(timeline.progress() * 100);
      setIsPlaying(!timeline.paused());
    };

    timeline.eventCallback('onUpdate', updateProgress);
    timeline.eventCallback('onComplete', () => setIsPlaying(false));

    return () => {
      timeline.eventCallback('onUpdate', null);
      timeline.eventCallback('onComplete', null);
    };
  }, [timeline]);

  const handlePlayPause = () => {
    if (isPlaying) {
      timeline.pause();
    } else {
      timeline.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    if (labels.length > 0) {
      const newStep = Math.max(0, currentStep - 1);
      setCurrentStep(newStep);
      timeline.tweenTo(labels[newStep]);
      onStepChange?.(newStep);
    } else {
      timeline.previous();
    }
  };

  const handleNext = () => {
    if (labels.length > 0) {
      const newStep = Math.min(labels.length - 1, currentStep + 1);
      setCurrentStep(newStep);
      timeline.tweenTo(labels[newStep]);
      onStepChange?.(newStep);
    } else {
      timeline.next();
    }
  };

  const handleRestart = () => {
    timeline.restart();
    setCurrentStep(0);
    setIsPlaying(false);
    onStepChange?.(0);
  };

  const handleProgressChange = (value: number) => {
    setProgress(value);
    timeline.progress(value / 100);
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
    timeline.timeScale(newSpeed);
  };

  const handleToggleProgress = () => {
    setShowProgressBar(!showProgressBar);
  };

  const iconSize = size === 'small' ? 20 : size === 'large' ? 28 : 24;
  const buttonSize = size === 'small' ? 'small' : size === 'large' ? 'large' : 'medium';

  const ProgressBar = () => {
    return (
      <Box sx={{ mt: -0.5 }}>
        <Slider
          value={progress}
          onChange={(_, value) => handleProgressChange(value as number)}
          sx={{
            '& .MuiSlider-thumb': {
              width: 12,
              height: 12,
            },
            '& .MuiSlider-track': {
              height: 2,
              borderRadius: 1,
            },
            '& .MuiSlider-rail': {
              height: 2,
              borderRadius: 1,
            }
          }}
        />
        <Typography 
          variant="caption" 
          color="text.secondary" 
          sx={{ 
            margin: 0,
            padding: 0,
            lineHeight: 1,
            mt: -1,
            mb: 0.5,
            textAlign: 'center',
            display: 'block'
          }}
        >
          {Math.round(progress)}%
        </Typography>
      </Box>
    );
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 3,
        background: 'transparent',
        color: theme.palette.text.primary
      }}
      // variant="outlined"
    >
      <Stack spacing={1.5}>
        {/* Progress Bar */}
        {showProgressBar && <ProgressBar />}

        {/* Control Buttons */}
        <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" sx={{ py: 0.5 }}>
          <Tooltip title="Restart">
            <IconButton
              onClick={handleRestart}
              size={buttonSize}
              sx={{ color: theme.palette.text.secondary }}
            >
              <RestartIcon sx={{ fontSize: iconSize }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Previous">
            <IconButton
              onClick={handlePrevious}
              disabled={currentStep === 0}
              size={buttonSize}
              sx={{ color: theme.palette.text.secondary }}
            >
              <PrevIcon sx={{ fontSize: iconSize }} />
            </IconButton>
          </Tooltip>

          <Tooltip title={isPlaying ? 'Pause' : 'Play'}>
            <IconButton
              onClick={handlePlayPause}
              size={buttonSize}
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                }
              }}
            >
              {isPlaying ? (
                <PauseIcon sx={{ fontSize: iconSize }} />
              ) : (
                <PlayIcon sx={{ fontSize: iconSize }} />
              )}
            </IconButton>
          </Tooltip>

          <Tooltip title="Next">
            <IconButton
              onClick={handleNext}
              disabled={labels.length > 0 ? currentStep === labels.length - 1 : false}
              size={buttonSize}
              sx={{ color: theme.palette.text.secondary }}
            >
              <NextIcon sx={{ fontSize: iconSize }} />
            </IconButton>
          </Tooltip>

          {showSpeed && (
            <Tooltip title="Speed">
              <IconButton
                onClick={() => handleSpeedChange(speed === 1 ? 0.5 : speed === 0.5 ? 2 : 1)}
                size={buttonSize}
                sx={{ color: theme.palette.text.secondary }}
              >
                <SpeedIcon sx={{ fontSize: iconSize }} />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title={showProgressBar ? 'Hide Progress' : 'Show Progress'}>
            <IconButton
              onClick={handleToggleProgress}
              size={buttonSize}
              sx={{ color: theme.palette.text.secondary }}
            >
              {showProgressBar ? (
                <VisibilityOffIcon sx={{ fontSize: iconSize }} />
              ) : (
                <VisibilityIcon sx={{ fontSize: iconSize }} />
              )}
            </IconButton>
          </Tooltip>
        </Stack>

        {/* Speed Indicator */}
        {showSpeed && speed !== 1 && (
          <Chip
            label={`${speed}x`}
            size="small"
            color="primary"
            variant="outlined"
            sx={{ alignSelf: 'center' }}
          />
        )}

        {/* Step Labels */}
        {labels.length > 0 && (
          <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap">
            {labels.map((label, index) => (
              <Chip
                key={label}
                label={label}
                size="small"
                color={index === currentStep ? 'primary' : 'default'}
                variant={index === currentStep ? 'filled' : 'outlined'}
                onClick={() => {
                  setCurrentStep(index);
                  timeline.tweenTo(label);
                  onStepChange?.(index);
                }}
                sx={{ cursor: 'pointer' }}
              />
            ))}
          </Stack>
        )}
      </Stack>
    </Paper>
  );
} 