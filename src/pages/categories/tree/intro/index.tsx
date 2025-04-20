import { Box, Button, Card, Grid, ThemeProvider, Typography } from "@mui/material";
import { grey } from '@mui/material/colors';
import React from "react";
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

        const resizeObserver = new ResizeObserver(() => refreshCanvas());

        resizeObserver.observe(container);

        return () => {
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

const Introduction = () => (
    <Box
        sx={{
            mx: 'auto',
            my: 6,
            p: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
        }}
    >
        <Typography variant="h3" align="center" gutterBottom>
            🌳 Tree
        </Typography>

        <Card
            variant="outlined"
            sx={{
                p: 3,
                border: "0px",
                backgroundColor: grey[100],
            }}
        >
            <Typography align="center" variant="body1" fontSize={22} sx={{ marginBottom: "20px" }} gutterBottom>
                <span style={{ color: 'green' }}>A tree is a special data structure used to represent hierarchical relationships.</span>
                &nbsp;At the top, there’s a single starting point called the
                <span style={{ color: 'green' }}> root</span>, and from there, branches grow to form <span style={{ color: 'green' }}>nodes</span>.
            </Typography>

            <Typography align="center" variant="body1" fontSize={22} sx={{ marginBottom: "20px" }} gutterBottom>
                Each <span style={{ color: 'green' }}>node</span> can have <span style={{ color: 'green' }}>child nodes</span>, and the connections between them are called
                <span style={{ color: 'green' }}> edges</span>. Nodes with no children are called <span style={{ color: 'green' }}>leaf nodes</span>.
            </Typography>

            <Typography align="center" variant="body1" fontSize={22} sx={{ marginBottom: "20px" }} gutterBottom>
                <span style={{ color: 'green' }}>A tree has no cycles</span> — you can never go back to a node by following the edges.
                This makes it a kind of <span style={{ color: 'green' }}>directed acyclic graph (DAG)</span>, where each node flows in one direction, from parent to children.
            </Typography>
        </Card>

        <Button sx={{ color: "#fff" }} size="large" variant="contained">Next</Button>
    </Box>
);

const Layout = () => (
    <Grid
        container
        sx={{
            flex: 1,
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
                backgroundColor: grey[100],
            }}
        >
            <Introduction />
        </Grid>
        <Grid
            item
            xs={12}
            md={6}
        >
            <Tree />
        </Grid>
    </Grid>
);

const Main = () => (
    <ThemeProvider theme={theme}>
        <Box
            display="flex"
            flexDirection="column"
            minHeight="100vh"
        >
            <Header />
            <Layout />
            <Footer />
        </Box>
    </ ThemeProvider>
);

export default Main;
