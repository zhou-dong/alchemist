import * as React from 'react';
import { Box, ThemeProvider, Container, Grid, Typography, Tabs, Tab, Paper } from '@mui/material';
import theme from '../../../commons/theme';
import Header from '../../commons/Header';
import Footer, { footerHeight } from '../../commons/Footer';
import { ContentCircle, Dragger, drawArrow, drawCircle, horizontalLinearResize } from '../../commons/circle';
import { steps } from './steps';
import { resetCanvas } from '../../commons/canvas';
import { setBasicTreePosition } from "./basics/tree";
import { useGamification } from './hooks/useGamification';
import { treeConcepts } from './data/concepts';
import { TreeConcept } from './types/gamification';
import StatsPanel from './components/StatsPanel';
import AchievementPanel from './components/AchievementPanel';
import TreeConceptCard from './components/TreeConceptCard';
import Leaderboard from './components/Leaderboard';
import GameSelectionModal from './components/GameSelectionModal';

let canvasWidth = 0;
let canvasHeight = 0;

const drawCircles = (context: CanvasRenderingContext2D) => {
    let previous: ContentCircle<string> = steps[0];
    drawCircle(context, previous);

    steps.slice(1).forEach(current => {
        drawCircle(context, current);
        drawArrow(context, previous, current);
        previous = current;
    });
}

const Roadmap = () => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    function drawCanvas(width: number, height: number): void {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (canvas && context) {
            resetCanvas(canvas, context, width, height);
            drawCircles(context);
            // drawTreeBasics(context);
        }
    }

    const handleClick = (circle: ContentCircle<string>) => {
        circle.selected = !circle.selected;

        if (circle.selected) {
            steps.forEach(step => {
                if (step !== circle) {
                    step.selected = false;
                }
            });
        }

        // setCategories(items => updateSegments(items, circle.value, circle.selected));
        drawCanvas(canvasWidth, canvasHeight);
    }

    const draggable = new Dragger<string>(drawCanvas, handleClick);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.addEventListener('mousedown', (e) => draggable.handleMouseDown(e, steps));
        canvas.addEventListener('mousemove', (e) => draggable.handleMouseMove(e, canvasWidth, canvasHeight));
        canvas.addEventListener('mouseup', (e) => draggable.handleMouseUp(e, steps));

        return () => {
            canvas.removeEventListener('mousedown', (e) => draggable.handleMouseDown(e, steps));
            canvas.removeEventListener('mousemove', (e) => draggable.handleMouseMove(e, canvasWidth, canvasHeight));
            canvas.removeEventListener('mouseup', (e) => draggable.handleMouseUp(e, steps));
        };
    }, [canvasRef]);

    React.useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;

        if (!container || !canvas) return;

        const refreshCanvas = () => {
            const { width, top } = container.getBoundingClientRect();
            const height = window.innerHeight - top - footerHeight;

            horizontalLinearResize(steps, width);
            setBasicTreePosition(width, height);
            drawCanvas(width, height);

            canvasWidth = width;
            canvasHeight = height;
        }

        refreshCanvas();

        let resizeTimeout: NodeJS.Timeout;
        const resizeObserver = new ResizeObserver(() => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                try {
                    refreshCanvas();
                } catch (error) {
                    // Ignore ResizeObserver loop errors
                    if (error instanceof Error && error.message.includes('ResizeObserver loop')) {
                        return;
                    }
                    throw error;
                }
            }, 16); // ~60fps
        });

        resizeObserver.observe(container);

        return () => {
            clearTimeout(resizeTimeout);
            resizeObserver.unobserve(container);
        };

    }, [containerRef, canvasRef]);

    return (
        <div
            ref={containerRef}
            style={{
                flex: 1
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    display: "block"
                }}
            >
            </canvas>
        </div>
    );
};

const GamifiedTreeCategory = () => {
    const { attemptConcept } = useGamification();
    const [tabValue, setTabValue] = React.useState(0);
    const [gameModalOpen, setGameModalOpen] = React.useState(false);
    const [selectedConcept, setSelectedConcept] = React.useState<TreeConcept | null>(null);

    const handleStartConcept = (conceptId: string) => {
        attemptConcept(conceptId);
        const concept = treeConcepts.find(c => c.id === conceptId);
        if (concept) {
            if (concept.games.length === 1) {
                // If only one game, go directly to it
                window.location.href = concept.games[0];
            } else if (concept.games.length > 1) {
                // If multiple games, show selection modal
                setSelectedConcept(concept);
                setGameModalOpen(true);
            }
        }
    };

    const handleSelectGame = (gamePath: string) => {
        window.location.href = gamePath;
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h3" component="h1" gutterBottom sx={{
                    background: 'linear-gradient(45deg, #4CAF50 30%, #2196F3 90%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 'bold',
                    textAlign: 'center'
                }}>
                    🌳 Tree Data Structures
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center', mb: 4 }}>
                    Master tree algorithms through interactive challenges and gamified learning
                </Typography>
            </Box>

            <StatsPanel />

            <Paper sx={{ mb: 3 }}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    variant="fullWidth"
                    sx={{ borderBottom: 1, borderColor: 'divider' }}
                >
                    <Tab label="Learning Path" />
                    <Tab label="Concepts" />
                    <Tab label="Achievements" />
                    <Tab label="Leaderboard" />
                </Tabs>

                {tabValue === 0 && (
                    <Box sx={{ p: 3 }}>
                        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                            Interactive Learning Path
                        </Typography>
                        <Roadmap />
                    </Box>
                )}

                {tabValue === 1 && (
                    <Box sx={{ p: 3 }}>
                        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                            Tree Concepts
                        </Typography>
                        <Grid container spacing={3}>
                            {treeConcepts.map((concept) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={concept.id}>
                                    <TreeConceptCard
                                        concept={concept}
                                        onStart={handleStartConcept}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}

                {tabValue === 2 && (
                    <AchievementPanel />
                )}

                {tabValue === 3 && (
                    <Box sx={{ p: 3 }}>
                        <Leaderboard />
                    </Box>
                )}
            </Paper>
            <GameSelectionModal
                open={gameModalOpen}
                onClose={() => setGameModalOpen(false)}
                concept={selectedConcept}
                onSelectGame={handleSelectGame}
            />
        </Container>
    );
};

const Main = () => (
    <ThemeProvider theme={theme}>
        <Box
            display="flex"
            flexDirection="column"
            minHeight="100vh"
        >
            <Header />
            <GamifiedTreeCategory />
            <Footer />
        </Box>
    </ ThemeProvider>
);

export default Main;
