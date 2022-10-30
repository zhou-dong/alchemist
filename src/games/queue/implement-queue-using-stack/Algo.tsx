import * as React from 'react';
import { Avatar, Button, ButtonGroup, Popover, PopoverOrigin } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useAlgoContext } from "./AlgoContext";
import StackItemBuilder from "./stackItemBuilder";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import ModeStandbyOutlinedIcon from '@mui/icons-material/ModeStandbyOutlined';
import { deepOrange, green } from '@mui/material/colors';
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

const DisplayValue: React.FC<{
    value: string,
    anchorEl: HTMLElement | null,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
    color?: string,
}> = ({ value, anchorEl, setAnchorEl, color }) => {

    const open = Boolean(anchorEl);
    const closePopover = () => setAnchorEl(null);
    const bgcolor = color || green[800];

    return (
        <Popover
            anchorEl={anchorEl}
            open={open}
            onClose={closePopover}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
            sx={{ "& .MuiPopover-paper": { borderRadius: "50%" } }}
        >
            <Avatar sizes='large' sx={{ width: 56, height: 56, bgcolor, fontSize: 35 }}>{value}</Avatar>
        </Popover>
    )
}

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

const shift = async (inn: Stack<string>, out: Stack<string>, minShellSize: number, scene: THREE.Scene) => {
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
}

const Enqueue = () => {

    const { stackIn, scene, animate, cancelAnimate, actionsDisabled, setActionsDisabled } = useAlgoContext();

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
                <ButtonGroup variant='outlined' disabled={actionsDisabled} size="large">
                    {Array.from(Array(9).keys()).map(value => <TypeButton key={value} value={value} />)}
                </ButtonGroup>
            </Popover>
            <Button onClick={handleClick} startIcon={<AddCircleOutlineOutlinedIcon />}>enqueue</Button>
        </>
    );
}

const Dequeue = () => {

    const { stackIn, stackOut, animate, cancelAnimate, setActionsDisabled, scene, minShellSize } = useAlgoContext();

    const [value, setValue] = React.useState("");

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
        await shift(inn, out, minShellSize, scene);
        const item = await out.pop();
        if (item) {
            item.hide();
            await decreaseShells(out, minShellSize);
            await wait(0.1);
        }
        if (item) {
            setValue(item.value);
            showPopover();
        }
    }

    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const ref = React.useRef(null);
    const showPopover = () => {
        if (ref && ref.current) {
            setAnchorEl(ref.current);
        }
    }

    return (
        <>
            <DisplayValue value={value} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
            <Button ref={ref} onClick={handleDequeue} startIcon={<RemoveCircleOutlineOutlinedIcon />}>dequeue</Button>
        </>
    )
}

const Empty = () => {
    const [value, setValue] = React.useState("");
    const [color, setColor] = React.useState<string>(green[800]);
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const ref = React.useRef(null);
    const showPopover = () => {
        if (ref && ref.current) {
            setAnchorEl(ref.current);
        }
    }

    const { stackIn, stackOut, animate, cancelAnimate, setActionsDisabled, scene, minShellSize } = useAlgoContext();

    const handleEmpty = async () => {
        if (!stackIn || !stackOut) {
            return;
        }
        setActionsDisabled(true);
        animate();
        await doEmpty(stackIn, stackOut);
        cancelAnimate();
        setActionsDisabled(false);
    }

    const doEmpty = async (inn: Stack<string>, out: Stack<string>) => {
        const isEmpty = await inn.isEmpty() && await out.isEmpty();
        if (isEmpty) {
            setValue("T");
            setColor(deepOrange[800]);
        } else {
            setValue("F");
            setColor(green[800]);
        }
        showPopover();
    }

    return (
        <>
            <DisplayValue value={value} anchorEl={anchorEl} setAnchorEl={setAnchorEl} color={color} />
            <Button ref={ref} onClick={handleEmpty} startIcon={<HelpOutlineOutlinedIcon />}>empty</Button>
        </>

    )
}

const Peek = () => {
    const [value, setValue] = React.useState("");
    const { stackIn, stackOut, animate, cancelAnimate, setActionsDisabled, scene, minShellSize } = useAlgoContext();
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const ref = React.useRef(null);
    const showPopover = () => {
        if (ref && ref.current) {
            setAnchorEl(ref.current);
        }
    }

    const handlePeek = async () => {
        if (!stackIn || !stackOut) {
            return;
        }
        setActionsDisabled(true);
        animate();
        await doPeek(stackIn, stackOut);
        cancelAnimate();
        setActionsDisabled(false);
    }

    const doPeek = async (inn: Stack<string>, out: Stack<string>) => {
        await shift(inn, out, minShellSize, scene);

        const item = await out.peek();
        if (item) {
            setValue(item.value);
            showPopover();
        }
    }

    return (
        <>
            <DisplayValue value={value} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
            <Button ref={ref} onClick={handlePeek} startIcon={<ModeStandbyOutlinedIcon />}>peek</Button>
        </>
    )
}

const Actions = styled("div")(() => ({
    width: "100%",
    textAlign: "center",
    position: "fixed",
    bottom: "250px"
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
