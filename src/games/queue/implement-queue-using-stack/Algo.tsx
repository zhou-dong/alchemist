import { Button } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";
import StackItemBuilder from "./stackItemBuilder";

const Enqueue = () => {

    const { stackIn, scene, animate, cancelAnimate } = useAlgoContext();

    const handleEnqueue = async () => {
        if (!stackIn) {
            return;
        }

        const item = new StackItemBuilder<string>(1 + "", scene).build();
        item.show();
        animate();
        await stackIn.push(item);
        cancelAnimate();
    }

    return (
        <>
            <Button onClick={handleEnqueue} variant="contained">enqueue</Button>
        </>
    );
}

const Dequeue = () => {

    const { stackIn, stackOut, animate, cancelAnimate } = useAlgoContext();

    const handleDequeue = async () => {
        if (!stackIn || !stackOut) {
            return;
        }

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
    }

    return (
        <Button onClick={handleDequeue} variant="contained">dequeue</Button>
    )
}

const Main = () => {

    return (
        <>
            <Enqueue />
            <Dequeue />
        </>
    );
}

export default Main;
