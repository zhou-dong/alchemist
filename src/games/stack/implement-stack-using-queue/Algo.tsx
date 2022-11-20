import * as React from 'react';
import { Avatar, Button, ButtonGroup, Popover, PopoverOrigin } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useAlgoContext } from "./AlgoContext";
import { deepOrange, green } from '@mui/material/colors';
import Queue from "../../../data-structures/queue";
import ModeStandbyOutlinedIcon from '@mui/icons-material/ModeStandbyOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { wait } from "../../../data-structures/_commons/utils";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import QueueItemBuilder from './queueItemBuilder';
import QueueName from "./queueName";
import QueueShellBuilder from './queueShellBuilder';

const increaseShells = (queue: Queue<string>, scene: THREE.Scene, size: number) => {
    const increaseSize = size - queue.shellsLength;
    for (let i = 0; i < increaseSize; i++) {
        const shell = new QueueShellBuilder(scene, true).build();
        queue.increaseShells(shell);
    }
    if (size === queue.shellsLength) {
        const shell = new QueueShellBuilder(scene, true).build();
        queue.increaseShells(shell);
    }
}

const decreaseShells = (queue: Queue<string>, minShellSize: number, size: number) => {
    let isDifferent = queue.shellsLength > size;
    while (queue.shellsLength > minShellSize && isDifferent) {
        const shell = queue.decreaseShells();
        if (shell) {
            shell.hide();
        }
        isDifferent = queue.shellsLength > size;
    }
}

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

const Actions = styled("div")(() => ({
    width: "100%",
    textAlign: "center",
    position: "fixed",
    bottom: "250px"
}));

const Push = () => {

    const {
        queue,
        scene,
        animate,
        cancelAnimate,
        actionsDisabled,
        setActionsDisabled,
        queueName,
        duration
    } = useAlgoContext();

    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const handlePush = async (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!queue || !queueName) {
            return;
        }
        const value = event.currentTarget.value;
        setActionsDisabled(true);
        animate();
        await doPush(queue, value, queueName);
        cancelAnimate();
        setActionsDisabled(false);
    }

    const doPush = async (queue: Queue<string>, value: string, queueName: QueueName) => {
        increaseShells(queue, scene, await queue.size());

        const item = new QueueItemBuilder<string>(value, scene, true).build();
        await queue.enqueue(item);

        const size = await queue.size();
        for (let i = 0; i < size - 1; i++) {
            const temp = await queue.dequeue();
            if (temp) {
                await queue.enqueue(temp);
            }
        }

        await wait(duration);
    }

    const openPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const closePopover = () => {
        setAnchorEl(null);
    }

    const TypeButton: React.FC<{ value: number }> = ({ value }) => (
        <Button key={value} value={value + 1} onClick={handlePush}>{value + 1}</Button>
    );


    return (
        <>
            <Popover
                anchorEl={anchorEl}
                open={open}
                onClose={closePopover}
                anchorOrigin={anchorOrigin}
                transformOrigin={transformOrigin}
            >
                <ButtonGroup variant='outlined' disabled={actionsDisabled} size="large">
                    {Array.from(Array(9).keys()).map(value => <TypeButton key={value} value={value} />)}
                </ButtonGroup>
            </Popover>
            <Button onClick={openPopover} startIcon={<AddCircleOutlineOutlinedIcon />}>push</Button>
        </>
    )
}

const Pop = () => {
    const { queue, animate, cancelAnimate, setActionsDisabled, minShellSize } = useAlgoContext();
    const [value, setValue] = React.useState("");
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const ref = React.useRef(null);

    const showPopover = () => {
        if (ref && ref.current) {
            setAnchorEl(ref.current);
        }
    }

    const handlePop = async () => {
        if (!queue) {
            return;
        }
        setActionsDisabled(true);
        animate();
        await doPop(queue);
        cancelAnimate();
        setActionsDisabled(false);
    }

    const doPop = async (queue: Queue<string>) => {
        const item = await queue.dequeue();
        if (item) {
            item.hide();
            const size = await queue.size();
            decreaseShells(queue, minShellSize, size);
            await wait(0.1);
        }
        if (item) {
            setValue(item.value);
            showPopover();
        }
    }

    return (
        <>
            <DisplayValue value={value} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
            <Button ref={ref} onClick={handlePop} startIcon={<RemoveCircleOutlineOutlinedIcon />}>pop</Button>
        </>
    )
}

const Top = () => {
    const { queue } = useAlgoContext();
    const [value, setValue] = React.useState("");
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const ref = React.useRef(null);

    const showPopover = () => {
        if (ref && ref.current) {
            setAnchorEl(ref.current);
        }
    }

    const handleTop = async () => {
        if (!queue) {
            return;
        }

        const item = await queue.peek();

        if (item) {
            setValue(item.value);
            showPopover();
        }
    }

    return (
        <>
            <DisplayValue value={value} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
            <Button ref={ref} onClick={handleTop} startIcon={<ModeStandbyOutlinedIcon />}>top</Button>
        </>
    )
}

const Empty = () => {
    const { queue } = useAlgoContext();
    const [value, setValue] = React.useState("");
    const [color, setColor] = React.useState<string>(green[800]);
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const ref = React.useRef(null);

    const showPopover = () => {
        if (ref && ref.current) {
            setAnchorEl(ref.current);
        }
    }

    const handleEmpty = async () => {
        if (!queue) {
            return;
        }

        const isEmpty = await queue.isEmpty();
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

const Main = () => {
    const { actionsDisabled } = useAlgoContext();
    return (
        <Actions>
            <ButtonGroup variant="contained" size="large" disabled={actionsDisabled}>
                <Push />
                <Pop />
                <Top />
                <Empty />
            </ButtonGroup>
        </Actions>
    )
}

export default Main;
