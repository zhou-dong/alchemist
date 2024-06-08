import { styled } from '@mui/system';
import MergeIcon from '@mui/icons-material/Merge';
import CheckIcon from '@mui/icons-material/Check';
import { Button, ButtonGroup } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";
import { wait } from '../../../../data-structures/_commons/utils';
import { State } from '../AlgoState';
import { Connection, Order } from './algo';
import { SimpleLink } from '../../../../data-structures/list/link.three';
import { linkColor, skinPostOrderColor, skinPreOrderColor } from '../styles';
import Position from "../../../../data-structures/_commons/params/position.interface";
import Code from './Code';

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
    const { animate, cancelAnimate, state, setState, index, setIndex, scene, displayCode } = useAlgoContext();

    const push = async () => {

    }

    return (
        <>
            <MainPosition>
                <ButtonGroup >
                    <Button
                        sx={{ zIndex: 3 }}
                        size='large'
                        onClick={push} startIcon={state === State.Finished ? <CheckIcon /> : <MergeIcon />}
                        disabled={state !== State.Playing}
                        color='success'
                        variant='outlined'
                    >
                        merge
                    </Button>
                </ButtonGroup>
            </MainPosition>
            {displayCode && <Code />}
        </>
    );
}

export default Play;
