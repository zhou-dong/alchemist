import { useAlgoContext } from "./AlgoContext";
import { Button, ButtonGroup, Stack, Typography } from '@mui/material';
import { wait } from "../../../data-structures/_commons/utils";
import { State } from "./AlgoState";
import SortIcon from '@mui/icons-material/Sort';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import { styled } from '@mui/system';

const DisplayNumber = styled(Typography)({
    border: "1px solid #bdbdbd",
    borderRadius: "50%",
    height: 45,
    width: 45,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

const DisplayInput = () => {
    const { n } = useAlgoContext();
    return (
        <div style={{
            position: "fixed",
            top: "25%",
            left: "16%",
        }}>
            <Stack direction="row" spacing={1} sx={{ display: "flex", alignItems: "center", justifyContent: "center", color: "green" }}>
                <DisplayNumber variant="h6">N</DisplayNumber>
                <DisplayNumber variant="h6">{n}</DisplayNumber>
            </Stack>
        </div>
    );
};

const factors = [2, 3, 5];

const DisplayFactors = () => {
    const { factorIndex, tip } = useAlgoContext();

    const getVariant = (i: number) => {
        if (factorIndex === undefined) {
            return "outlined";
        }
        if (factorIndex === i) {
            return "contained";
        }
        return "outlined"
    }

    return (
        <div style={{
            position: "fixed",
            top: "35%",
            left: "16%",
        }}
        >
            <Stack direction="column" spacing={2} justifyContent="center">
                <Typography color="green" variant="h5">
                    {tip}
                </Typography>
                <ButtonGroup size="large" color="success">
                    {
                        factors.map((factor, i) =>
                            <Button
                                key={i}
                                sx={{ width: 45, height: 45 }}
                                variant={getVariant(i)}
                            >
                                <Typography variant="h5">
                                    {factor}
                                </Typography>
                            </Button>
                        )
                    }
                </ButtonGroup>
            </Stack>
        </div>
    );
}

const DisplayResult = () => {
    const { result } = useAlgoContext();

    const Content = () => (
        <Button size="large" variant="outlined" color="success">
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

    const { animate, cancelAnimate, state, setState, minHeap, setResult, n, setN, seen, setFactorIndex, setTip } = useAlgoContext();

    const handleBuildHeap = async () => {
        if (!minHeap) return;
        setState(State.Computing);
        animate();
        try {
            await minHeap.insert(1);
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
            const root = await minHeap.delete();
            if (root) {
                setResult(root);
                for (let i = 0; i < factors.length; i++) {
                    const factor = factors[i];
                    const next = root * factor;
                    setFactorIndex(i);
                    setTip(`${root} * ${factor} = ${next}`);
                    if (!seen.has(next)) {
                        await minHeap.insert(next);
                        seen.add(next);
                    }
                }
            }
            await wait(0.1);
        } catch (error) {
            console.error(error);
        }
        setFactorIndex(undefined);
        setTip(undefined);
        cancelAnimate();
        setState(State.Playing);
        setN(n => (n !== undefined) ? n - 1 : undefined);
    }

    return (
        <>
            {(n !== undefined) && <DisplayInput />}
            <DisplayFactors />
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
                        disabled={state !== State.Playing || n === 0}
                    >
                        run
                    </Button>
                </ButtonGroup>
            </div>
        </>
    );
}

export default Main;
