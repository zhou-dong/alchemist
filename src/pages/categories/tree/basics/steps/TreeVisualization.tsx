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
    lastClickedNode?: number | null;
    lastClickResult?: 'correct' | 'incorrect' | null;
}

export const TreeVisualization: React.FC<TreeVisualizationProps> = ({
    containerRef,
    canvasRef,
    onNodeClick,
    highlightedNodes = [],
    selectedNodes = [],
    disabledNodes = [],
    lastClickedNode = null,
    lastClickResult = null,
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
                node.color = 'default';
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

        // Apply last clicked node color (this should override other states)
        if (lastClickedNode !== null && lastClickResult) {
            const node = treeNodes[lastClickedNode];
            if (node) {
                node.color = lastClickResult;
                node.selected = false; // Override selected state for color feedback
                if (lastClickResult === 'correct') {
                    node.emoji = "✓";
                } else if (lastClickResult === 'incorrect') {
                    node.emoji = "✗";
                }
            }
        }

        // Refresh canvas
        refreshCanvas(containerRef, canvasRef);
    }, [highlightedNodes, selectedNodes, disabledNodes, lastClickedNode, lastClickResult, isInitialized, containerRef, canvasRef]);

    return (
        <Box
            ref={containerRef}
            sx={{
                cursor: onNodeClick ? "pointer" : "default",
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
        </Box>
    );
};
