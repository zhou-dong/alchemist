import * as React from 'react';
import { Button, ButtonGroup, Divider, Stack, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useAlgoContext } from "./AlgoContext";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';

const Actions = styled(Stack)(() => ({
    position: "fixed",
    top: "30%",
    left: "50%",
    transform: "translate(-50%)",
    alignItems: "center"
}));

const DisplayInput = () => {
    const { index, input } = useAlgoContext();
    return (
        <ButtonGroup size='large' color='success'>
            {
                input.map((num, i) =>
                    <Button
                        key={i}
                        variant={(index === i) ? "contained" : "outlined"}
                    >
                        {num}
                    </Button>
                )
            }
        </ButtonGroup>
    );
};

const DisplayDeque = () => {
    const { deque } = useAlgoContext();
    return (
        <ButtonGroup size='large' color='success'>
            {
                deque.map((item, i) =>
                    <Button
                        key={i}
                        variant={(i === 0 || i === deque.length - 1) ? "contained" : "outlined"}
                        sx={{ display: "inline-block" }}
                    >
                        <Typography sx={{ textTransform: 'lowercase' }}>
                            index: {item.index}
                        </Typography>
                        <Divider />
                        <Typography sx={{ textTransform: 'lowercase' }}>
                            value: {item.value}
                        </Typography>
                    </Button>
                )
            }
        </ButtonGroup>
    );
};

const Main = () => {
    const { actionsDisabled } = useAlgoContext();
    return (
        <Actions direction="column" spacing={2}>
            <DisplayInput />
            <DisplayDeque />

            <ButtonGroup variant="contained" size="large">
                <Button startIcon={<RemoveCircleOutlineOutlinedIcon />}>pop</Button>
                <Button startIcon={<AddCircleOutlineOutlinedIcon />}>push</Button>
                <Button endIcon={<RemoveCircleOutlineOutlinedIcon />}>shift</Button>
            </ButtonGroup>
        </Actions>
    );
}

export default Main;
