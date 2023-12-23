import { styled } from '@mui/system';
import { Button } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";
import React from 'react';
import { buildNode } from './styles';
import { wait } from '../../../../data-structures/_commons/utils';

const Position = styled("div")({
    position: "fixed",
    top: 200,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "40%",
    zIndex: 0
});

const Play = () => {
    const { scene, animate, cancelAnimate, list } = useAlgoContext();

    const [num, setNum] = React.useState(1);

    const push = async () => {
        animate();
        const node = buildNode(scene, num);
        list.push(node);
        setNum(n => n + 1);
        await wait(0.1);
        cancelAnimate();
    }

    return (
        <Position>
            <Button onClick={push} >
                add
            </Button>
        </Position>
    );
}

export default Play;
