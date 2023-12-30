import { styled } from '@mui/system';
import { Button } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import { useAlgoContext } from "./AlgoContext";
import { State } from "../AlgoState";
import { wait } from '../../../../data-structures/_commons/utils';
import { SimpleLink } from '../../../../data-structures/list/link.three';
import { linkColor } from '../styles';
import Position from '../../../../data-structures/_commons/params/position.interface';
import Code from './Code';
import MouseIcon from '@mui/icons-material/Mouse';

const MainPosition = styled("div")({
    position: "fixed",
    bottom: 200,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1
});

const Play = () => {
    const { scene, state, setState, animate, cancelAnimate, displayCode, setIndex, index, items } = useAlgoContext();

    const handleClick = async () => {

        setState(State.Typing);

        const item = items[index + 1];

        console.log(item);

        if (!item) {
            setState(State.Finished);
            return;
        }

        console.log(index);

        try {
            animate();
            await wait(0.1);
        } catch (error) {
            console.log(error);
        } finally {
            cancelAnimate();
        }

        setIndex(i => i + 1);
        setState(State.Playing);
    }

    return (
        <>
            <MainPosition>
                <Button
                    sx={{ zIndex: 3 }}
                    onClick={handleClick}
                    startIcon={state === State.Finished ? <CheckIcon /> : <MouseIcon />}
                    disabled={state !== State.Playing}
                    size="large"
                    variant='outlined'
                    color='success'
                >
                    Next
                </Button>
            </MainPosition>
            {displayCode && <Code />}
        </>
    );
}

export default Play;
