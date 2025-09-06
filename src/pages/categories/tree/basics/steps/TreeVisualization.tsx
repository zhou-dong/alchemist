import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { treeNodes, setBasicTreePosition, drawTreeBasics, refreshCanvas } from "../tree";

interface TreeVisualizationProps {
    containerRef: React.RefObject<HTMLDivElement>;
    canvasRef: React.RefObject<HTMLCanvasElement>;
    onNodeClick?: (nodeIndex: number, nodeValue: string) => void;
    highlightedNodes?: number[];
    selectedNodes?: number[];
    disabledNodes?: number[];
    showLabels?: boolean;
}

export const TreeVisualization: React.FC<TreeVisualizationProps> = ({
    containerRef,
    canvasRef,
    onNodeClick,
    highlightedNodes = [],
    selectedNodes = [],
    disabledNodes = [],
    showLabels = true
}) => {
    const [isInitialized, setIsInitialized] = React.useState(false);

    // Initialize tree visualization
    useEffect(() => {
        if (!isInitialized) {
            refreshCanvas(containerRef, canvasRef);
            setIsInitialized(true);
        }
    }, [isInitialized, containerRef, canvasRef]);

    // Handle canvas click events
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !onNodeClick) return;

        const handleCanvasClick = (event: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            // Check which node was clicked
            treeNodes.forEach((node, index) => {
                if (!node) return;

                const distance = Math.sqrt(
                    Math.pow(x - node.x, 2) + Math.pow(y - node.y, 2)
                );

                if (distance <= node.radius) {
                    onNodeClick(index, node.value);
                }
            });
        };

        canvas.addEventListener('click', handleCanvasClick);
        return () => canvas.removeEventListener('click', handleCanvasClick);
    }, [canvasRef, onNodeClick]);

    // Update tree visualization when props change
    useEffect(() => {
        if (!isInitialized) return;

        // Reset all nodes
        treeNodes.forEach(node => {
            if (node) {
                node.selected = false;
                node.emoji = "";
            }
        });

        // Apply highlights
        highlightedNodes.forEach(index => {
            const node = treeNodes[index];
            if (node) {
                node.selected = true;
                node.emoji = "✨";
            }
        });

        // Apply selections
        selectedNodes.forEach(index => {
            const node = treeNodes[index];
            if (node) {
                node.selected = true;
                node.emoji = "✓";
            }
        });

        // Apply disabled state
        disabledNodes.forEach(index => {
            const node = treeNodes[index];
            if (node) {
                node.selected = false;
                node.emoji = "🚫";
            }
        });

        // Refresh canvas
        refreshCanvas(containerRef, canvasRef);
    }, [highlightedNodes, selectedNodes, disabledNodes, isInitialized, containerRef, canvasRef]);

    return (
        <Box
            ref={containerRef}
            sx={{
                width: "100%",
                height: "400px",
                position: "relative",
                border: "2px solid #E0E0E0",
                borderRadius: "12px",
                backgroundColor: "#FAFAFA",
                overflow: "hidden",
                cursor: onNodeClick ? "pointer" : "default"
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    width: "100%",
                    height: "100%",
                    display: "block"
                }}
            />
            {showLabels && (
                <Box
                    sx={{
                        position: "absolute",
                        top: 8,
                        left: 8,
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        color: "#666"
                    }}
                >
                    Click on nodes to interact
                </Box>
            )}
        </Box>
    );
};
