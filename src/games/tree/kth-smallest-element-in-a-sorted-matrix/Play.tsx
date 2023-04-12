import { HeapItem, useAlgoContext } from "./AlgoContext";
import { Button, ButtonGroup, Stack, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import { wait } from "../../../data-structures/_commons/utils";
import { State } from "./AlgoState";
import SortIcon from '@mui/icons-material/Sort';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';

const DisplayInput = () => {
    const { current, matrix, k, completed } = useAlgoContext();

    const inComplete = (row: number, col: number): boolean => {
        for (let i = 0; i < completed.length; i++) {
            const position = completed[i];
            if (position.row === row && position.col === col) {
                return true;
            }
        }
        return false;
    }

    const getBackgroundColor = (row: number, col: number) => {
        if (inComplete(row, col)) {
            return "#bdbdbd";
        }
        if (row === current.row && col === current.col) {
            return "green";
        }
        return "#fff";
    }

    const getColor = (row: number, col: number) => {
        if (inComplete(row, col)) {
            return "#fff";
        }
        if (row === current.row && col === current.col) {
            return "#fff";
        }
        return "#000";
    }

    return (
        <div style={{
            position: "fixed",
            top: "25%",
            left: "16%",
        }}>
            <Stack direction="row" spacing={1} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography
                    variant="h6"
                    sx={{
                        border: "1px solid #bdbdbd",
                        borderRadius: "50%",
                        height: 45,
                        width: 45,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    K
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        border: "1px solid #bdbdbd",
                        borderRadius: "50%",
                        height: 45,
                        width: 45,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {k}
                </Typography>
            </Stack>

            <div style={{ textAlign: "center", marginTop: "30px" }}>
                <Typography variant="h6">Matrix</Typography>
            </div>

            <Table>
                <TableBody>
                    {
                        matrix.map((row, i) =>
                            <TableRow key={i}>
                                {
                                    row.map((col, j) =>
                                        <TableCell
                                            key={j}
                                            padding="none"
                                            sx={{
                                                color: getColor(i, j),
                                                width: "65px",
                                                textAlign: "center",
                                                paddingTop: 0.4,
                                                paddingBottom: 0.4,
                                                backgroundColor: getBackgroundColor(i, j)
                                            }}
                                        >
                                            <Typography variant="h6">
                                                {col}
                                            </Typography>
                                        </TableCell>)
                                }
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </div>
    );
}

const DisplayResult = () => {
    const { result } = useAlgoContext();

    const Content = () => (
        <Button size="large" variant="contained" color="success">
            <Typography variant="h5">
                {result}
            </Typography>
        </Button>
    );

    return (
        <div style={{
            position: "fixed",
            bottom: "240px",
            left: "50%",
            transform: "translate(-50%)",
        }}>
            {result && <Content />}
        </div>
    );
}

const Main = () => {

    const { animate, cancelAnimate, state, setState, minHeap, matrix, setCurrent, completed, setResult, setK, k } = useAlgoContext();

    const handleBuildHeap = async () => {
        if (!minHeap) return;
        setState(State.Computing);
        animate();
        try {
            for (let row = 0; row < matrix.length; row++) {
                const col = 0;
                const item = new HeapItem(matrix[row][col], row, col);
                setCurrent({ row, col });
                await minHeap.insert(item);
            }
            setCurrent({ row: 0, col: 0 });
            await wait(0.1);
        } catch (error) {
            console.error(error);
        }
        cancelAnimate();
        setState(State.Playing);
    }

    const handleRun = async () => {
        if (!minHeap) return;
        setState(State.Computing);
        animate();
        try {
            const root = await minHeap.delete();
            if (root) {
                const { val, row, col } = root;
                if (col + 1 < matrix[row].length) {
                    const item = new HeapItem(matrix[row][col + 1], row, col + 1);
                    setCurrent({ row: item.row, col: item.col });
                    await minHeap.insert(item);
                }
                completed.push({ row, col });
                setResult(val);

                if (k !== 1) {
                    const peek = await minHeap.peek();
                    if (peek) {
                        const { row, col } = peek;
                        setCurrent({ row, col });
                    }
                } else {
                    setCurrent({ row, col });
                }
            }
            await wait(0.1);
        } catch (error) {
            console.error(error);
        }
        cancelAnimate();
        setK(k => k - 1);
        setState(State.Playing);
    }

    return (
        <>
            {(matrix.length || "") && <DisplayInput />}

            <DisplayResult />
            <div style={{
                position: "fixed",
                bottom: "150px",
                left: "50%",
                transform: "translate(-50%)",
            }}
            >
                <ButtonGroup size='large' variant='contained'>
                    <Button
                        color="success"
                        startIcon={<SortIcon />}
                        onClick={handleBuildHeap}
                        disabled={state !== State.BuildingHeap}
                    >
                        build heap
                    </Button>
                    <Button
                        color="success"
                        startIcon={<PlayCircleFilledWhiteOutlinedIcon />}
                        onClick={handleRun}
                        disabled={state !== State.Playing || k === 0}
                    >
                        run
                    </Button>
                </ButtonGroup>
            </div>
        </>
    );
}

export default Main;
