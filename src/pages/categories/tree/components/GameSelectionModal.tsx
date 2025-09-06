import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  Avatar
} from '@mui/material';
import { PlayArrow, Close, Timer, Star } from '@mui/icons-material';
import { TreeConcept } from '../types/gamification';

interface GameSelectionModalProps {
  open: boolean;
  onClose: () => void;
  concept: TreeConcept | null;
  onSelectGame: (gamePath: string) => void;
}

const GameSelectionModal: React.FC<GameSelectionModalProps> = ({
  open,
  onClose,
  concept,
  onSelectGame
}) => {
  if (!concept) return null;

  const handleGameSelect = (gamePath: string) => {
    onSelectGame(gamePath);
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ fontSize: 32, mr: 2 }}>
            {concept.emoji}
          </Typography>
          <Box>
            <Typography variant="h5" component="div">
              {concept.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {concept.description}
            </Typography>
          </Box>
        </Box>
        <Button onClick={onClose} startIcon={<Close />}>
          Close
        </Button>
      </DialogTitle>

      <DialogContent>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Choose a Game to Play
        </Typography>

        {concept.games.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              No games available for this concept yet.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Coming soon!
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {concept.games.map((gamePath, index) => {
              // Extract game name from path
              const gameName = gamePath.split('/').pop()?.replace(/-/g, ' ') || `Game ${index + 1}`;
              const difficulty = concept.difficulty;
              
              return (
                <Grid item xs={12} sm={6} key={gamePath}>
                  <Card 
                    sx={{ 
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 4
                      }
                    }}
                    onClick={() => handleGameSelect(gamePath)}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                          {index + 1}
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" component="div">
                            {gameName}
                          </Typography>
                          <Chip 
                            label={difficulty}
                            size="small"
                            color={
                              difficulty === 'beginner' ? 'success' :
                              difficulty === 'intermediate' ? 'warning' :
                              difficulty === 'advanced' ? 'error' : 'secondary'
                            }
                          />
                        </Box>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Timer sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            ~{concept.estimatedTime}m
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Star sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {concept.maxScore} pts
                          </Typography>
                        </Box>
                      </Box>

                      <Button
                        variant="contained"
                        fullWidth
                        startIcon={<PlayArrow />}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleGameSelect(gamePath);
                        }}
                      >
                        Start Game
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GameSelectionModal;
