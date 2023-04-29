import * as React from 'react';
import { styled } from '@mui/system';
import { useAlgoContext } from "./AlgoContext";
import { Divider, IconButton, InputBase, Paper, Stack, Typography } from '@mui/material';
import { wait } from "../../../data-structures/_commons/utils";
import { State } from "./AlgoState";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const ButtonPosition = styled("div")({
    position: "fixed",
    bottom: "200px",
    left: "50%",
    transform: "translate(-50%)",
});

const KthLargestValuePosition = styled("div")({
    position: "fixed",
    top: "20%",
    left: "20%",
});

const DisplayKthLargestValue = () => {
    const { kthLargestValue } = useAlgoContext();

    const Item = styled(Paper)({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "55px",
    });

    return (
        <KthLargestValuePosition>
            <Stack direction="row" spacing={2}>
                <Item
                    elevation={5}
                    sx={{ width: "160px" }}
                >
                    kth Largest Value
                </Item>
                <Item
                    elevation={5}
                    sx={{ width: "55px", borderRadius: "50%" }}
                >
                    <Typography variant='h5' color="green">
                        {kthLargestValue}
                    </Typography>
                </Item>
            </Stack>
        </KthLargestValuePosition>
    );
};

const Main = () => {

    const { animate, cancelAnimate, state, setState, heap, k, setKthLargestValue } = useAlgoContext();
    const [num, setNum] = React.useState<number>(1);

    const handleNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        if (value !== undefined && value !== null) {
            setNum(+value);
        }
    };

    const doAddToHeap = async () => {
        if (!heap) {
            return;
        }

        await heap.insert(num);
        const size = await heap.size();
        if (size > k) {
            await heap.delete();
        }

        const root = await heap.peek();
        if (root) {
            setKthLargestValue(root);
        }
    };

    const handleAddToHeap = async () => {
        if (!heap) {
            return;
        }
        setState(State.Computing);
        animate();
        try {
            await doAddToHeap();
            await wait(0.2);
        } catch (error) {
            console.error(error);
        }
        cancelAnimate();
        setState(State.Play);
    };

    return (
        <>
            <DisplayKthLargestValue />

            <ButtonPosition>
                <Paper
                    variant="elevation"
                    elevation={8}
                    sx={{
                        p: '2px 4px',
                        display: 'flex',
                        width: 150,
                        alignItems: "center"
                    }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1, }}
                        placeholder='number'
                        type="number"
                        value={num}
                        onChange={handleNumChange}
                    />
                    <Divider sx={{ height: 28, m: 0.5, borderColor: "gray" }} orientation="vertical" />
                    <IconButton
                        type="button"
                        sx={{ p: '10px' }}
                        disabled={state !== State.Play}
                        onClick={handleAddToHeap}
                        color="success"
                    >
                        <AddCircleOutlineIcon />
                    </IconButton>
                </Paper>
            </ButtonPosition>
        </>
    );
}

export default Main;
