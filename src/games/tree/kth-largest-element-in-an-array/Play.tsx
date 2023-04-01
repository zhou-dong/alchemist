import { useAlgoContext } from "./AlgoContext";
import { Button, ButtonGroup } from '@mui/material';
import { wait } from "../../../data-structures/_commons/utils";
import { State } from "./AlgoState";
import SortIcon from '@mui/icons-material/Sort';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const Main = () => {

    const { animate, cancelAnimate, state, setState, heap } = useAlgoContext();

    const duration = 1;

    const handleHeapify = async () => {
        if (!heap) return;

        setState(State.Computing);
        animate();

        try {
            await heap.heapify(duration);
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
            await heap.delete(duration);
            await wait(0.5);
        } catch (error) {
            console.error(error);
        }

        setState(State.Playing);
        cancelAnimate();
    }

    return (
        <div style={{
            position: "fixed",
            bottom: "150px",
            left: "50%",
            transform: "translate(-50%)",
        }}
        >
            <ButtonGroup size='medium' variant='contained'>
                <Button
                    startIcon={<SortIcon />}
                    onClick={handleHeapify}
                >
                    heapify
                </Button>
                <Button
                    startIcon={<RemoveCircleOutlineIcon />}
                    onClick={handleDelete}
                    disabled={state !== State.Playing}
                >
                    delete
                </Button>
            </ButtonGroup>
        </div>
    );
}

export default Main;
