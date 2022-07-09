import * as React from 'react';
import { Button, ButtonGroup } from "@mui/material";
import BackspaceIcon from '@mui/icons-material/Backspace';
import Queue from '../../../data-structures/queue';

interface Props {
    queue: Queue<string>;
    animate: () => void;
    cancelAnimate: () => void;
}

const Main = ({ animate, cancelAnimate, queue }: Props) => {

    const [disabled, setDisabled] = React.useState(false);

    const push = async (value: string) => {
        setDisabled(true);
        animate();
        await queue.enqueue(value);
        cancelAnimate();
        setDisabled(false);

    }

    const pop = async () => {
        setDisabled(true);
        animate();
        await queue.dequeue();
        cancelAnimate();
        setDisabled(false);
    }

    return (
        <div style={{ width: "100%", textAlign: "center", position: "fixed", bottom: "100px" }}>

            <ButtonGroup variant="contained" aria-label="valid parentheses input" size="large" disabled={disabled}>
                <Button onClick={() => push("(")}>(</Button>
                <Button onClick={() => push(")")}>)</Button>
                <Button onClick={() => push("[")}>[</Button>
                <Button onClick={() => push("]")}>]</Button>
                <Button onClick={() => push("{")}>{"{"}</Button>
                <Button onClick={() => push("}")}>{"}"}</Button>

                <Button endIcon={<BackspaceIcon />} onClick={pop}>Delete</Button>
            </ButtonGroup>

            <div style={{ margin: "20px" }}></div>

            <Button variant='contained' disabled={disabled}>
                Play
            </Button>
        </div>

    )
}

export default Main;
