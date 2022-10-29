import { Button, ButtonGroup } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useAlgoContext } from "./AlgoContext";
import StackItemBuilder from "./stackItemBuilder";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import ModeStandbyOutlinedIcon from '@mui/icons-material/ModeStandbyOutlined';

const Enqueue = () => {

    const { stackIn, scene, animate, cancelAnimate, setActionsDisabled } = useAlgoContext();

    const handleEnqueue = async () => {
        if (!stackIn) {
            return;
        }

        setActionsDisabled(true);

        const item = new StackItemBuilder<string>(1 + "", scene).build();
        item.show();
        animate();
        await stackIn.push(item);
        cancelAnimate();

        setActionsDisabled(false);
    }

    return (
        <Button onClick={handleEnqueue} startIcon={<AddCircleOutlineOutlinedIcon />}>enqueue</Button>
    );
}

const Dequeue = () => {

    const { stackIn, stackOut, animate, cancelAnimate, setActionsDisabled } = useAlgoContext();

    const handleDequeue = async () => {
        if (!stackIn || !stackOut) {
            return;
        }

        setActionsDisabled(true);

        animate()
        const stackOutSize = await stackOut.size();
        if (stackOutSize === 0) {
            let item = await stackIn.pop();
            while (item) {
                stackOut.push(item);
                item = await stackIn.pop();
            }
        }

        const item = await stackOut.pop();
        if (item) {
            item.hide();
        }

        await stackIn.pop();
        cancelAnimate();

        setActionsDisabled(false);
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

const Actions = styled("div")(() => ({
    width: "100%",
    textAlign: "center",
    position: "fixed",
    bottom: "200px"
}));

const Peek = () => {


    return (
        <Button startIcon={<ModeStandbyOutlinedIcon />}>peek</Button>
    )
}

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
