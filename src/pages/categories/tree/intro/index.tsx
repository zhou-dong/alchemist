import { Box, Button, Card, Grid, ThemeProvider, Typography, Container } from "@mui/material";
import React from "react";
import { useNavigate } from 'react-router-dom';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { drawTreeBasics, setBasicTreePosition } from "./tree";
import { resetCanvas } from "../../../commons/canvas";
import Footer, { footerHeight } from "../../../commons/Footer";
import theme from "../../../../commons/theme";
import Header from "../../../commons/Header";

const Tree = () => {

    const containerRef = React.useRef<HTMLDivElement>(null);
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    function drawCanvas(width: number, height: number): void {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (canvas && context) {
            resetCanvas(canvas, context, width, height);
            drawTreeBasics(context);
        }
    }

    React.useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;

        if (!container || !canvas) return;

        const refreshCanvas = () => {
            const { width, top } = container.getBoundingClientRect();
            const height = window.innerHeight - top - footerHeight;

            setBasicTreePosition(width, height);
            drawCanvas(width, height);
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
                height: "100%",
            }}>
            <canvas
                ref={canvasRef}
                style={{
                    display: "block",
                }}
            />
        </div>
    );
}

const Introduction = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="lg">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    py: 8,
                    px: 2,
                }}
            >
                {/* Airbnb-style header */}
                <Box sx={{ textAlign: 'left', mb: 6 }}>
                    <Typography
                        variant="h2"
                        sx={{
                            color: '#222222',
                            fontWeight: 600,
                            fontSize: { xs: '2.5rem', md: '3.5rem' },
                            lineHeight: 1.1,
                            mb: 2,
                            letterSpacing: '-0.02em'
                        }}
                    >
                        🌳 Tree Data Structures
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{
                            color: '#717171',
                            fontWeight: 400,
                            fontSize: { xs: '1.1rem', md: '1.25rem' },
                            lineHeight: 1.4,
                            maxWidth: '600px'
                        }}
                    >
                        Master hierarchical data organization through interactive learning and hands-on practice.
                    </Typography>
                </Box>

                {/* Airbnb-style content cards */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, mb: 6 }}>
                    <Card
                        sx={{
                            p: 0,
                            borderRadius: 3,
                            backgroundColor: 'white',
                            border: 'none',
                            boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
                            overflow: 'hidden',
                        }}
                    >
                        <Box sx={{ p: 5 }}>
                            <Typography
                                variant="h4"
                                sx={{
                                    color: '#222222',
                                    fontWeight: 600,
                                    mb: 4,
                                    fontSize: '1.5rem'
                                }}
                            >
                                What is a Tree?
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontSize: '1.1rem',
                                        lineHeight: 1.6,
                                        color: '#222222',
                                        fontWeight: 400
                                    }}
                                >
                                    A <Box component="span" sx={{ fontWeight: 600, color: '#4CAF50' }}>tree</Box> is a special data structure used to represent hierarchical relationships.
                                    At the top, there's a single starting point called the <Box component="span" sx={{ fontWeight: 600, color: '#4CAF50' }}>root</Box>,
                                    and from there, branches grow to form <Box component="span" sx={{ fontWeight: 600, color: '#4CAF50' }}>nodes</Box>.
                                </Typography>

                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontSize: '1.1rem',
                                        lineHeight: 1.6,
                                        color: '#222222',
                                        fontWeight: 400
                                    }}
                                >
                                    Each <Box component="span" sx={{ fontWeight: 600, color: '#4CAF50' }}>node</Box> can have <Box component="span" sx={{ fontWeight: 600, color: '#4CAF50' }}>child nodes</Box>,
                                    and the connections between them are called <Box component="span" sx={{ fontWeight: 600, color: '#4CAF50' }}>edges</Box>.
                                    Nodes with no children are called <Box component="span" sx={{ fontWeight: 600, color: '#4CAF50' }}>leaf nodes</Box>.
                                </Typography>

                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontSize: '1.1rem',
                                        lineHeight: 1.6,
                                        color: '#222222',
                                        fontWeight: 400
                                    }}
                                >
                                    A tree has <Box component="span" sx={{ fontWeight: 600, color: '#222222' }}>no cycles</Box> — you can never go back to a node by following the edges.
                                    This makes it a kind of <Box component="span" sx={{ fontWeight: 600, color: '#222222' }}>directed acyclic graph (DAG)</Box>,
                                    where each node flows in one direction, from parent to children.
                                </Typography>
                            </Box>
                        </Box>
                    </Card>
                </Box>

                {/* Airbnb-style action buttons */}
                <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                    <Button
                        startIcon={<SportsEsportsIcon />}
                        size="large"
                        variant="contained"
                        onClick={() => navigate("/pages/categories/tree/basics")}
                        sx={{
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            px: 4,
                            py: 2,
                            borderRadius: 2,
                            fontSize: '1rem',
                            fontWeight: 600,
                            textTransform: 'none',
                            boxShadow: 'none',
                            '&:hover': {
                                backgroundColor: '#45A049',
                                boxShadow: '0 4px 12px rgba(76, 175, 80, 0.4)',
                            },
                            transition: 'all 0.2s ease',
                        }}
                    >
                        Learn Basics
                    </Button>
                    <Button
                        startIcon={<RocketLaunchIcon />}
                        size="large"
                        variant="outlined"
                        onClick={() => navigate("/pages/categories/tree/challenges")}
                        sx={{
                            borderColor: '#222222',
                            color: '#222222',
                            px: 4,
                            py: 2,
                            borderRadius: 2,
                            fontSize: '1rem',
                            fontWeight: 600,
                            textTransform: 'none',
                            borderWidth: '1px',
                            '&:hover': {
                                backgroundColor: '#222222',
                                color: 'white',
                                borderColor: '#222222',
                            },
                            transition: 'all 0.2s ease',
                        }}
                    >
                        Jump to Challenges
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

const Main = () => (
    <Grid
        container
        sx={{
            flex: 1,
            backgroundColor: '#FFFFFF',
        }}
    >
        <Grid
            item
            xs={12}
            md={6}
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                backgroundColor: '#FFFFFF',
                borderRight: { md: '1px solid #DDDDDD' },
            }}
        >
            <Introduction />
        </Grid>
        <Grid
            item
            xs={12}
            md={6}
            sx={{
                backgroundColor: '#F7F7F7',
                position: 'relative',
            }}
        >
            <Tree />
        </Grid>
    </Grid>
);

const Index = () => (
    <ThemeProvider theme={theme}>
        <Box
            display="flex"
            flexDirection="column"
            minHeight="100vh"
        >
            <Header />
            <Main />
            <Footer />
        </Box>
    </ ThemeProvider>
);

export default Index;
