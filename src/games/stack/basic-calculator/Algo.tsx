import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { Button } from '@mui/material';
import AlgoExpression from "./AlgoExpression";
import { useAlgoContext } from './AlgoContext';
import { State } from './AlgoState';

const Next = () => {

    const { index, setIndex, state } = useAlgoContext();


    const handleClick = () => {
        setIndex(i => i + 1);
    }


    return (

        <div style={{ width: "100%", textAlign: "center", position: "fixed", bottom: "200px" }}>
            <Button
                aria-label="next"
                size="large"
                value="next"
                onClick={handleClick}
                disabled={state !== State.Playing}
                variant="contained"
                endIcon={<ArrowForwardOutlinedIcon />}
                sx={{ color: "#FFF" }}
            >
                next
            </Button>
        </div>
    );
}

const Main = () => {

    return (
        <>
            <AlgoExpression />

            <Next />
        </>
    )
};


export default Main;
