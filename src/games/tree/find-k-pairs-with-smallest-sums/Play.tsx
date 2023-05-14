import { HeapItem, useAlgoContext } from "./AlgoContext";
import { Button, ButtonGroup, Stack, Typography } from '@mui/material';
import { wait } from "../../../data-structures/_commons/utils";
import { State } from "./AlgoState";
import SortIcon from '@mui/icons-material/Sort';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';

const DisplayK = () => {
    const { k } = useAlgoContext();
    return (
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
    );
};

const DisplayNums = () => {
    const { current, nums1, nums2 } = useAlgoContext();
    const { x, y } = current;
    return (
        <>
            <ButtonGroup size="large" color="success">
                {
                    nums1.map((num, i) => <Button key={i} variant={(i === x) ? "contained" : "outlined"}>{num}</Button>)
                }
            </ButtonGroup>
            <ButtonGroup size="large" color="success">
                {
                    nums2.map((num, i) => <Button key={i} variant={(i === y) ? "contained" : "outlined"}>{num}</Button>)
                }
            </ButtonGroup>
        </>
    );
};

const DisplayInput = () => (
    <div style={{
        position: "fixed",
        top: "25%",
        left: "16%",
    }}>
        <Stack direction="column" spacing={2}>
            <DisplayK />
            <DisplayNums />
        </Stack>
    </div>
);

const DisplayResult = () => {
    const { results } = useAlgoContext();

    const Content = () => (
        <ButtonGroup>
            {
                results.map((item, i) =>
                    <Button
                        size="large"
                        variant="contained"
                        color="success"
                        key={i}
                    >
                        {`[${item.join(",")}]`}
                    </Button>
                )
            }
        </ButtonGroup>
    );

    return (
        <div style={{
            position: "fixed",
            bottom: "240px",
            left: "50%",
            transform: "translate(-50%)",
        }}>
            {(results.length || "") && <Content />}
        </div>
    );
};

const buildSetKey = (x: number, y: number): string => {
    return x + "," + y;
};

const Main = () => {

    const { animate, cancelAnimate, state, setState, minHeap, setCurrent, results, setK, k, nums1, nums2, seen } = useAlgoContext();

    const handleBuildHeap = async () => {
        if (!minHeap) {
            return;
        }
        const a = nums1[0];
        const b = nums2[0];
        if (a === undefined || b === undefined) {
            return;
        }
        setState(State.Computing);
        animate();
        try {
            const item = new HeapItem(0, 0, a, b);
            await minHeap.insert(item);
            setCurrent({ x: 0, y: 0 });
            seen?.add(buildSetKey(0, 0));
            await wait(0.1);
        } catch (error) {
            console.error(error);
        }
        cancelAnimate();
        setState(State.Playing);
    }

    const handleRun = async () => {
        if (!minHeap) return;
        if (!seen) return;

        setState(State.Computing);
        animate();
        try {
            const root = await minHeap.pop();
            if (root) {
                const { x, y, a, b } = root;
                results.push([a, b]);
                if (x + 1 < nums1.length) {
                    const key = buildSetKey(x + 1, y);
                    if (!seen.has(key)) {
                        setCurrent({ x: x + 1, y });
                        const item = new HeapItem(x + 1, y, nums1[x + 1], b);
                        await minHeap.insert(item);
                        seen.add(key);
                    }
                }
                if (y + 1 < nums2.length) {
                    const key = buildSetKey(x, y + 1);
                    if (!seen.has(key)) {
                        setCurrent({ x, y: y + 1 });
                        const item = new HeapItem(x, y + 1, a, nums2[y + 1]);
                        await minHeap.insert(item);
                        seen.add(key);
                    }
                }
            }
            const peek = await minHeap.peek();
            if (peek) {
                const { x, y } = peek;
                setCurrent({ x, y });
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
            {(nums1.length || nums2.length || "") && <DisplayInput />}

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
