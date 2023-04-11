import { ListNode, useAlgoContext } from "./AlgoContext";
import { Button, ButtonGroup, Stack, Typography } from '@mui/material';
import { wait } from "../../../data-structures/_commons/utils";
import { State } from "./AlgoState";
import SortIcon from '@mui/icons-material/Sort';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';

const DisplayLists = () => {
    const { lists, key, finishedKeys } = useAlgoContext();

    const getList = (node: ListNode): ListNode[] => {
        const result: ListNode[] = [];
        let current: ListNode | undefined = node;
        while (current) {
            result.push(current);
            current = current.next
        }
        return result;
    };

    return (
        <div style={{
            position: "fixed",
            top: "30%",
            left: "16%",
        }}>
            <Stack spacing={1}>
                <div style={{ textAlign: "center", color: "gray" }}>
                    {lists.length > 0 && <Typography variant="h6">input</Typography>}
                </div>
                {
                    lists.map((head, i) =>
                        <ButtonGroup key={i} size="large" color="success">
                            {
                                getList(head).map((node, j) =>
                                    <Button
                                        key={j}
                                        variant={(node.key === key) ? "contained" : "outlined"}
                                        sx={{ borderColor: "lightgray", width: "65px" }}
                                        disabled={finishedKeys.includes(node.key)}
                                    >
                                        <Typography variant="h5">
                                            {node.val}
                                        </Typography>
                                    </Button>)
                            }
                        </ButtonGroup>
                    )
                }
            </Stack>
        </div>
    );
}

const DisplayResults = () => {
    const { results } = useAlgoContext();
    return (
        <div style={{
            position: "fixed",
            bottom: "240px",
            left: "50%",
            transform: "translate(-50%)",
        }}>
            <ButtonGroup size="large" variant="contained" color="success">
                {
                    results.map((item, i) =>
                        <Button key={i}>
                            <Typography variant="h5">
                                {item}
                            </Typography>
                        </Button>)
                }
            </ButtonGroup>
        </div>
    );
}

const Main = () => {

    const { animate, cancelAnimate, state, setState, minHeap, lists, results, setKey, finishedKeys } = useAlgoContext();

    const handleBuildHeap = async () => {
        if (!minHeap) return;
        setState(State.Computing);
        animate();
        try {
            for (let i = 0; i < lists.length; i++) {
                await minHeap.insert(lists[i]);
            }
            const peek = await minHeap.peek()
            if (peek) {
                setKey(peek.key); // setKey, which will be used for display input
            }
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
                results.push(root.val);
                finishedKeys.push(root.key);
            }
            if (root && root.next) {
                await minHeap.insert(root.next);
            }
            const peek = await minHeap.peek()
            if (peek) {
                setKey(peek.key); // setKey, which will be used for display input
            }
            if (await minHeap.isEmpty()) {
                setState(State.Finished);
                setKey(-1);
            } else {
                setState(State.Playing);
            }
            await wait(0.1);
        } catch (error) {
            console.error(error);
        }
        cancelAnimate();
    }

    return (
        <>
            <DisplayLists />
            <DisplayResults />
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
                        disabled={state !== State.Playing}
                    >
                        run
                    </Button>
                </ButtonGroup>
            </div>
        </>
    );
}

export default Main;
