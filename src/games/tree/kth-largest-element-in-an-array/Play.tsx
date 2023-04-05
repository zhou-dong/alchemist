import { useAlgoContext } from "./AlgoContext";
import { Button, ButtonGroup, Stack, ToggleButton, Typography } from '@mui/material';
import { wait } from "../../../data-structures/_commons/utils";
import { State } from "./AlgoState";
import SortIcon from '@mui/icons-material/Sort';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const Main = () => {

    const { animate, cancelAnimate, state, setState, heap, k, setK, setResult, result } = useAlgoContext();

    const handleHeapify = async () => {
        if (!heap) return;
        setState(State.Typing);
        animate();

        try {
            await heap.heapify();
        } catch (error) {
            console.error(error);
        }

        setState(State.Playing);
        cancelAnimate();
    }

    const handleDelete = async () => {
        if (!heap) return;

        setState(State.Computing);
        animate();

        try {
            const root = await heap.delete();
            setResult(root);
            setK(k => k - 1);
            await wait(0.5);
        } catch (error) {
            console.error(error);
        }

        setState(State.Playing);
        cancelAnimate();
    }

    return (
        <>
            <div style={{
                position: "fixed",
                top: "150px",
                left: "20%"
            }}>
                <Stack spacing={2} direction="row">
                    <ToggleButton value="k" sx={{ borderRadius: "50%", height: 75, width: 75, }} >
                        <Typography variant="h4" color="darkgray">
                            {k}
                        </Typography>
                    </ToggleButton>
                    <ToggleButton value="r" sx={{ borderRadius: "50%", height: 75, width: 75, }}>
                        <Typography variant="h4" color="green">
                            {result}
                        </Typography>
                    </ToggleButton>
                </Stack>
            </div>

            <div style={{
                position: "fixed",
                bottom: "150px",
                left: "50%",
                transform: "translate(-50%)",
            }}
            >
                <ButtonGroup size='large' variant='contained'>
                    <Button
                        startIcon={<SortIcon />}
                        onClick={handleHeapify}
                        disabled={state !== State.Computing}
                    >
                        heapify
                    </Button>
                    <Button
                        startIcon={<RemoveCircleOutlineIcon />}
                        onClick={handleDelete}
                        disabled={state !== State.Playing || k <= 0}
                    >
                        delete
                    </Button>
                </ButtonGroup>
            </div>
        </>
    );
}

export default Main;
