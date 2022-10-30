import * as React from 'react';
import { Button, ButtonGroup, Popover, PopoverOrigin } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useAlgoContext } from "./AlgoContext";
import StackItemBuilder from "./stackItemBuilder";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import ModeStandbyOutlinedIcon from '@mui/icons-material/ModeStandbyOutlined';
import Stack from "../../../data-structures/stack";
import { wait } from "../../../data-structures/_commons/utils";
import StackShellBuilder from './stackShellBuilder';

const anchorOrigin: PopoverOrigin = {
    vertical: 'top',
    horizontal: 'center',
};

const transformOrigin: PopoverOrigin = {
    vertical: 'bottom',
    horizontal: 'center',
};

const increaseShells = async (stack: Stack<string>, scene: THREE.Scene) => {
    const size = await stack.size();
    const increaseSize = size - stack.shellsLength;
    for (let i = 0; i < increaseSize; i++) {
        const shell = new StackShellBuilder(scene, true).build();
        stack.increaseShells(shell);
    }
    if (size === stack.shellsLength) {
        const shell = new StackShellBuilder(scene, true).build();
        stack.increaseShells(shell);
    }
}

const decreaseShells = async (stack: Stack<string>, minShellSize: number) => {
    let isDifferent = stack.shellsLength > await stack.size();
    while (stack.shellsLength > minShellSize && isDifferent) {
        const shell = stack.decreaseShells();
        if (shell) {
            shell.hide();
        }
        isDifferent = stack.shellsLength > await stack.size();
    }
}

const Enqueue = () => {

    const { stackIn, scene, animate, cancelAnimate, actionsDisabled, setActionsDisabled, minShellSize } = useAlgoContext();

    const handleEnqueue = async (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!stackIn) {
            return;
        }
        setActionsDisabled(true);
        const value = event.currentTarget.value;
        animate();
        await increaseShells(stackIn, scene);
        await doEnqueue(stackIn, value);
        cancelAnimate();
        setActionsDisabled(false);
    }

    const doEnqueue = async (stack: Stack<string>, value: string) => {
        const item = new StackItemBuilder<string>(value, scene, true).build();
        await stack.push(item);
    }

    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handlePopoverClose = () => {
        setAnchorEl(null);
    }

    const TypeButton: React.FC<{ value: number }> = ({ value }) => (
        <Button key={value} value={value + 1} onClick={handleEnqueue}>{value + 1}</Button>
    );

    return (
        <>
            <Popover
                anchorEl={anchorEl}
                open={open}
                onClose={handlePopoverClose}
                anchorOrigin={anchorOrigin}
                transformOrigin={transformOrigin}
            >
                <ButtonGroup variant='outlined' disabled={actionsDisabled}>
                    {Array.from(Array(9).keys()).map(value => <TypeButton key={value} value={value} />)}
                </ButtonGroup>
            </Popover>
            <Button onClick={handleClick} startIcon={<AddCircleOutlineOutlinedIcon />}>enqueue</Button>
        </>
    );
}

const Dequeue = () => {

    const { stackIn, stackOut, animate, cancelAnimate, setActionsDisabled, scene, minShellSize } = useAlgoContext();

    const handleDequeue = async () => {
        if (!stackIn || !stackOut) {
            return;
        }
        setActionsDisabled(true);
        animate();
        await doDequeue(stackIn, stackOut);
        cancelAnimate();
        setActionsDisabled(false);
    }

    const doDequeue = async (inn: Stack<string>, out: Stack<string>) => {
        const isOutEmpty: boolean = await out.isEmpty();

        if (isOutEmpty) {
            let item = await inn.pop();
            await decreaseShells(inn, minShellSize);

            while (item) {
                await increaseShells(out, scene);
                await out.push(item);

                item = await inn.pop();
                await decreaseShells(inn, minShellSize);
            }
        }

        const item = await out.pop();
        if (item) {
            item.hide();
            await decreaseShells(out, minShellSize);
            await wait(0.1);
        }
    }

    return (
        <Button onClick={handleDequeue} startIcon={<RemoveCircleOutlineOutlinedIcon />}>dequeue</Button>
    )
}

const Empty = () => {


    return (
        <Button startIcon={<HelpOutlineOutlinedIcon />}>empty</Button>
    )
}

const Peek = () => {


    return (
        <Button startIcon={<ModeStandbyOutlinedIcon />}>peek</Button>
    )
}

const Actions = styled("div")(() => ({
    width: "100%",
    textAlign: "center",
    position: "fixed",
    bottom: "200px"
}));

const Main = () => {
    const { actionsDisabled } = useAlgoContext();
    return (
        <Actions>
            <ButtonGroup variant="contained" size="large" disabled={actionsDisabled}>
                <Enqueue />
                <Dequeue />
                <Peek />
                <Empty />
            </ButtonGroup>
        </Actions>
    );
}

export default Main;
