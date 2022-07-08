import * as React from 'react';
import { Button, ButtonGroup } from "@mui/material";
import BackspaceIcon from '@mui/icons-material/Backspace';
import Stack from '../../../data-structures/stack';

interface Props {
    stack?: Stack<string>;
    animate: () => void;
    cancelAnimate: () => void;
}

const Main = ({ stack, animate, cancelAnimate }: Props) => {

    const [disabled, setDisabled] = React.useState(false);

    const push = async (value: string) => {
        if (stack) {
            setDisabled(true);
            animate();
            await stack.push(value);
            cancelAnimate();
            setDisabled(false);
        }
    }

    const pop = async () => {
        if (stack) {
            setDisabled(true);
            animate();
            await stack.pop();
            cancelAnimate();
            setDisabled(false);
        }
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
