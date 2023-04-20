import { HeapItem, useAlgoContext } from "./AlgoContext";
import { Button, ButtonGroup, Stack, Table, TableBody, TableCell, TableHead, TableRow, ToggleButton } from '@mui/material';
import { styled } from '@mui/system';
import { wait } from "../../../data-structures/_commons/utils";
import { State } from "./AlgoState";
import MouseIcon from '@mui/icons-material/Mouse';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';

const DisplayWords = () => {
    const { words, wordsIndex } = useAlgoContext();

    const Position = styled('div')({
        position: "fixed",
        top: "100px",
        left: "50%",
        transform: "translate(-50%)",
    });

    return (
        <Position>
            <ButtonGroup size="medium">
                {
                    words.map((word, i) =>
                        <Button
                            key={i}
                            variant={(wordsIndex === i) ? "contained" : "outlined"}
                            sx={{ borderColor: "lightgray", textTransform: "none", color: "#000", fontWeight: "normal" }}
                        >
                            {word}
                        </Button>)
                }
            </ButtonGroup>
        </Position>
    );
};

const DisplayMap = () => {
    const { map, heapItems, heapItemsIndex } = useAlgoContext();

    const getMapStyle = (word: string) => {
        if (word === heapItems[heapItemsIndex]?.word) {
            return { backgroundColor: "green", color: "#FFF" };
        } else {
            return {};
        }
    }

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell sx={{ textAlign: "center" }}>Word</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>Count</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    map && Array.from(map!).map(([key, value], i) =>
                        <TableRow key={i}>
                            <TableCell sx={{ ...getMapStyle(key), textAlign: "center" }}>
                                {key}
                            </TableCell>
                            <TableCell sx={{ ...getMapStyle(key), textAlign: "center" }}>
                                {value}
                            </TableCell>
                        </TableRow>
                    )
                }
            </TableBody>
        </Table>
    );
};

const DisplayK = () => {
    const { k } = useAlgoContext();
    const sx = { height: "45px", width: "45px", borderRadius: "50%" };
    return (
        <Stack spacing={2} direction="row" sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <ToggleButton value="K-N" sx={sx}>
                k
            </ToggleButton>
            <ToggleButton value="K-V" sx={sx}>
                {k}
            </ToggleButton>
        </Stack>
    );
};

const Main = () => {

    const { animate, cancelAnimate, state, setState, heap, map, k, result, wordsIndex, setWordsIndex, words, setHeapItemsIndex, heapItems, heapItemsIndex, setHeapItems } = useAlgoContext();

    const handleCount = () => {
        if (!map) return;

        const word = words[wordsIndex];
        if (word === undefined) return;

        const count = map.get(word) || 0;
        map.set(word, count + 1);

        const next = words[wordsIndex + 1];
        if (next === undefined) {
            setState(State.AddToHeap);
            setHeapItemsIndex(0);
            setHeapItems(() => Array.from(map).map(([w, c]) => new HeapItem(w, c)));
        }

        setWordsIndex(i => i + 1);
    }

    const handleAddToHeap = async () => {
        if (!heap) return;

        const item = heapItems[heapItemsIndex];
        if (!item) return;

        setState(State.Computing);
        animate();

        try {
            await heap.insert(item);
            if (await heap.size() === k + 1) {
                await heap.delete();
            }
        } catch (error) {
            console.error(error);
        }

        if (heapItems[heapItemsIndex + 1]) {
            setState(State.AddToHeap);
        } else {
            setState(State.PopFromHeap);
        }

        setHeapItemsIndex(i => i + 1);
        await wait(0.5);
        cancelAnimate();
    }

    const handlePopFromHeap = async () => {
        if (!heap) return;

        setState(State.Computing);
        animate();

        try {
            const root = await heap.delete();
            if (root) {
                result.unshift(root.word);
            }
            const peek = await heap.peek();
            if (peek) {
                setState(State.PopFromHeap);
            } else {
                setState(State.Finished);
            }
        } catch (error) {
            console.error(error);
        }

        await wait(0.5);
        cancelAnimate();
    }

    const DisplayResult = () => {
        const indexStyle = { border: "none", textAlign: "center", paddingTop: "3px" };
        const wordStyle = { textAlign: "center", paddingBottom: "3px" };
        return (
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell sx={wordStyle}>Top K Words</TableCell>
                        {
                            Array.from(result).map((word, i) => <TableCell key={i} sx={wordStyle}>{word}</TableCell>)
                        }
                    </TableRow>
                    <TableRow>
                        <TableCell sx={indexStyle}></TableCell>
                        {
                            Array.from(result).map((_, i) => <TableCell key={i} sx={indexStyle}>{i}</TableCell>)
                        }
                    </TableRow>
                </TableBody>
            </Table>
        );
    }
    const Dashboard = () => (
        <Stack spacing={2} direction="column" alignItems="flex-start">
            <DisplayK />
            <DisplayMap />
        </Stack >
    );

    return (
        <>
            <DisplayWords />
            <div style={{
                position: "fixed",
                top: "150px",
                left: "10%"
            }}>
                {state !== State.Typing && <Dashboard />}
            </div>

            <div style={{
                position: "fixed",
                bottom: "150px",
                left: "50%",
                transform: "translate(-50%)",
            }}
            >
                <Stack spacing={2} sx={{ display: "flex", alignItems: "center" }}>
                    <DisplayResult />
                    <ButtonGroup size='large' variant='outlined'>
                        <Button
                            color="success"
                            startIcon={<MouseIcon />}
                            onClick={handleCount}
                            disabled={state !== State.Count}
                        >
                            count frequence
                        </Button>
                        <Button
                            color="success"
                            startIcon={<AddCircleOutlineIcon />}
                            onClick={handleAddToHeap}
                            disabled={state !== State.AddToHeap}
                        >
                            Add to Heap
                        </Button>
                        <Button
                            color="success"
                            startIcon={<RemoveCircleOutlineOutlinedIcon />}
                            onClick={handlePopFromHeap}
                            disabled={state !== State.PopFromHeap}
                        >
                            Pop from Heap
                        </Button>
                    </ButtonGroup>
                </Stack>
            </div>
        </>
    );
}

export default Main;
