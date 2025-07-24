import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Slider,
  Typography,
  Box,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  useTheme,
  IconButton
} from '@mui/material';
import * as PlayArrow from '@mui/icons-material/PlayArrow';
import * as Close from '@mui/icons-material/Close';
import * as RestartAlt from '@mui/icons-material/RestartAlt';

const PlayIcon = PlayArrow.default as unknown as React.ElementType;
const CloseIcon = Close.default as unknown as React.ElementType;
const RestartAltIcon = RestartAlt.default as unknown as React.ElementType;

interface KmvConfigDialogProps {
  open: boolean;
  onClose: () => void;
  onStart: (config: KmvConfig) => void;
}

export interface KmvConfig {
  k: number;
  animationSpeed: number;
  streamSize: number;
}

export default function KmvConfigDialog({ open, onClose, onStart }: KmvConfigDialogProps) {
  const theme = useTheme();
  const [config, setConfig] = useState<KmvConfig>({
    k: 5,
    animationSpeed: 1,
    streamSize: 100
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateConfig = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (config.k < 1 || config.k > 50) {
      newErrors.k = 'K must be between 1 and 50';
    }

    if (config.streamSize < 10 || config.streamSize > 10000) {
      newErrors.streamSize = 'Stream size must be between 10 and 10,000';
    }

    if (config.k >= config.streamSize) {
      newErrors.k = 'K must be less than stream size';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStart = () => {
    if (validateConfig()) {
      onStart(config);
      onClose();
    }
  };

  const handleReset = () => {
    setConfig({
      k: 5,
      animationSpeed: 1,
      streamSize: 100
    });
    setErrors({});
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 3,
          background: theme.palette.mode === 'dark'
            ? 'rgba(18, 18, 18, 0.95)'
            : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(0, 0, 0, 0.1)'}`,
          color: theme.palette.text.primary
        }
      }}
    >
      <DialogTitle sx={{ pb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">
          KMV Animation Configuration
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {/* K Value Configuration */}

          <TextField
            fullWidth
            type="number"
            value={config.k}
            onChange={(e) => setConfig({ ...config, k: parseInt(e.target.value) || 0 })}
            error={!!errors.k}
            helperText={errors.k || "K: Number of smallest hash values to keep"}
            size="small"
          />

          <TextField
            fullWidth
            type="number"
            value={config.streamSize}
            onChange={(e) => setConfig({ ...config, streamSize: parseInt(e.target.value) || 0 })}
            error={!!errors.streamSize}
            helperText={errors.streamSize || "Stream Size: Number of elements to process"}
            size="small"
          />

          {/* Stream Size Configuration */}
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0 }}>
            <Chip
              label={`Estimated accuracy: ${Math.round((1 - Math.sqrt(1 / config.k - 1 / config.streamSize)) * 100)}%)`}
              size="small"
              color="secondary"
              variant="outlined"
            />
                          <Typography variant="caption" color="text.secondary">
                {config.streamSize > config.k * 100 ?
                  `Note: Accuracy converges to ~${Math.round((1 - 1 / Math.sqrt(config.k)) * 100)}% when N >> K` :
                  'Accuracy improves as K increases relative to N'
                }
              </Typography>
          </Stack>

          {/* Animation Speed */}
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Animation Speed
            </Typography>
            <Box sx={{ px: 2 }}>
              <Slider
                value={config.animationSpeed}
                onChange={(_, value) => setConfig({ ...config, animationSpeed: value as number })}
                min={0.1}
                max={3}
                step={0.1}
                marks={[
                  { value: 0.1, label: '0.1x' },
                  { value: 1, label: '1x' },
                  { value: 3, label: '3x' }
                ]}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}x`}
              />
            </Box>
            <Typography variant="caption" color="text.secondary">
              {config.animationSpeed < 1 ? 'Slower - Good for learning' :
                config.animationSpeed > 1 ? 'Faster - Quick overview' :
                  'Normal speed - Balanced view'}
            </Typography>
          </Box>

          {/* Validation Alert */}
          {Object.keys(errors).length > 0 && (
            <Alert severity="error" sx={{ mt: 1 }}>
              Please fix the configuration errors above before starting the animation.
            </Alert>
          )}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button
          onClick={handleReset}
          variant="outlined"
          startIcon={<RestartAltIcon />}
          sx={{ textTransform: 'none' }}
        >
          Reset
        </Button>

        <Button
          onClick={handleStart}
          variant="contained"
          startIcon={<PlayIcon />}
          disabled={Object.keys(errors).length > 0}
        >
          Start Animation
        </Button>
      </DialogActions>
    </Dialog>
  );
} 