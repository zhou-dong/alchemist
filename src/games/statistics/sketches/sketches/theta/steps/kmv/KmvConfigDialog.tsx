import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Stack,
  Chip,
  Alert,
  useTheme,
  IconButton
} from '@mui/material';
import * as Close from '@mui/icons-material/Close';
import * as RestartAlt from '@mui/icons-material/RestartAlt';
import * as SportsEsports from '@mui/icons-material/SportsEsports';

const CloseIcon = Close.default as unknown as React.ElementType;
const RestartAltIcon = RestartAlt.default as unknown as React.ElementType;
const SportsEsportsIcon = SportsEsports.default as unknown as React.ElementType;

interface KmvConfigDialogProps {
  open: boolean;
  onClose: () => void;
  onStart: () => void;
  k: number;
  streamSize: number;
  setK: (k: number) => void;
  setStreamSize: (streamSize: number) => void;
  defaultK: number;
  defaultStreamSize: number;
}

export default function KmvConfigDialog({
  open,
  onClose,
  onStart,
  k,
  streamSize,
  setK,
  setStreamSize,
  defaultK,
  defaultStreamSize
}: KmvConfigDialogProps) {
  const theme = useTheme();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateConfig = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (k < 1 || k > 50) {
      newErrors.k = 'K must be between 1 and 50';
    }

    if (streamSize < 10 || streamSize > 10000) {
      newErrors.streamSize = 'Stream size must be between 10 and 10,000';
    }

    if (k >= streamSize) {
      newErrors.k = 'K must be less than stream size';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStart = () => {
    if (validateConfig()) {
      onStart();
      onClose();
    }
  };

  const handleReset = () => {
    setK(defaultK);
    setStreamSize(defaultStreamSize);
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
        <Typography>
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
            value={k}
            onChange={(e) => setK(parseInt(e.target.value) || 0)}
            error={!!errors.k}
            helperText={errors.k || "K: Number of smallest hash values to keep"}
            size="small"
          />

          <TextField
            fullWidth
            type="number"
            value={streamSize}
            onChange={(e) => setStreamSize(parseInt(e.target.value) || 0)}
            error={!!errors.streamSize}
            helperText={errors.streamSize || "Stream Size: Number of elements to process"}
            size="small"
          />

          {/* Stream Size Configuration */}
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0 }}>
            <Chip
              label={`Estimated accuracy: ${Math.round((1 - Math.sqrt(1 / k - 1 / streamSize)) * 100)}%)`}
              size="small"
              color="secondary"
              variant="outlined"
            />
            <Typography variant="caption" color="text.secondary">
              {streamSize > k * 100 ?
                `Note: Accuracy converges to ~${Math.round((1 - 1 / Math.sqrt(k)) * 100)}% when N >> K` :
                'Accuracy improves as K increases relative to N'
              }
            </Typography>
          </Stack>

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
          startIcon={<SportsEsportsIcon />}
          disabled={Object.keys(errors).length > 0}
        >
          Start
        </Button>
      </DialogActions>
    </Dialog>
  );
} 
