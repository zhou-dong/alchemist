import React, { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  Slider,
  Typography,
  Paper,
  Stack,
  Tooltip,
  useTheme,
  Menu,
  MenuItem,
  ListItemText
} from '@mui/material';

import * as PlayArrow from '@mui/icons-material/PlayArrow';
import * as Pause from '@mui/icons-material/Pause';
import * as RestartAlt from '@mui/icons-material/RestartAlt';
import * as Speed from '@mui/icons-material/Speed';

const PlayIcon = PlayArrow.default as unknown as React.ElementType;
const PauseIcon = Pause.default as unknown as React.ElementType;
const RestartIcon = RestartAlt.default as unknown as React.ElementType;
const SpeedIcon = Speed.default as unknown as React.ElementType;

interface TimelinePlayerProps {
  timeline: any; // GSAP Timeline
  showProgress?: boolean;
  showSpeed?: boolean;
  size?: 'small' | 'medium' | 'large';
  onStart: () => void;
  onPause: () => void;
  onComplete: () => void;
}

export default function TimelinePlayer({
  timeline,
  showSpeed = true,
  size = 'medium',
  onStart,
  onPause,
  onComplete,
}: TimelinePlayerProps) {
  const theme = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [speedMenuAnchor, setSpeedMenuAnchor] = useState<null | HTMLElement>(null);

  // Speed options
  const speedOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 3];

  // Update progress when timeline changes
  useEffect(() => {
    if (!timeline) return;

    // Pause timeline initially to prevent auto-start
    timeline.pause();
    onPause();

    const updateProgress = () => {
      setProgress(timeline.progress() * 100);
      setIsPlaying(!timeline.paused());
    };

    timeline.eventCallback('onUpdate', updateProgress);
    timeline.eventCallback('onComplete', () => {
      setIsPlaying(false);
      onComplete();
    });

    return () => {
      timeline.eventCallback('onUpdate', null);
      timeline.eventCallback('onComplete', null);
    };
  }, [timeline]);

  const handlePlayPause = () => {
    if (isPlaying) {
      timeline.pause();
      onPause();
    } else {
      timeline.play();
      onStart();
    }
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    timeline.restart();
    setIsPlaying(true);
  };

  const handleProgressChange = (value: number) => {
    setProgress(value);
    timeline.progress(value / 100);
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
    timeline.timeScale(newSpeed);
    setSpeedMenuAnchor(null);
  };

  const handleSpeedMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setSpeedMenuAnchor(event.currentTarget);
  };

  const handleSpeedMenuClose = () => {
    setSpeedMenuAnchor(null);
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
        <ProgressBar />

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

          {showSpeed && (
            <>
              <Tooltip title="Speed Settings">
                <IconButton
                  onClick={handleSpeedMenuOpen}
                  size={buttonSize}
                  sx={{ color: theme.palette.text.secondary }}
                >
                  <SpeedIcon sx={{ fontSize: iconSize }} />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={speedMenuAnchor}
                open={Boolean(speedMenuAnchor)}
                onClose={handleSpeedMenuClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
              >
                {speedOptions.map((speedOption) => (
                  <MenuItem
                    key={speedOption}
                    onClick={() => handleSpeedChange(speedOption)}
                    selected={speed === speedOption}
                  >
                    <ListItemText>{speedOption}x</ListItemText>
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}

        </Stack>

      </Stack>
    </Paper>
  );
} 