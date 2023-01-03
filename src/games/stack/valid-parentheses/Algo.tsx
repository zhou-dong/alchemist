import * as React from 'react';
import * as THREE from 'three';
import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import RemoveFromQueueIcon from '@mui/icons-material/RemoveFromQueue';
import { useAlgoContext } from "./AlgoContext";
import { wait } from '../../../data-structures/_commons/utils';
import Instructions from "./Instructions";
import AlgoMap from "./AlgoMap";
import DangerousOutlinedIcon from '@mui/icons-material/DangerousOutlined';
import AlgoAlert, { AlgoAlertContent } from "./AlgoAlert"
import { styled } from '@mui/material/styles';
import AlgoCode from './AlgoCode';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { State } from "./AlgoState";

const AlgoMapContainer = styled("div")(() => ({
    position: "fixed",
    textAlign: "center",
    right: 45,
    top: 60
}));

const Actions = () => {

    const [alertAnchorEl, setAlertAnchorEl] = React.useState<null | HTMLElement>(null);
    const [alertContent, setAlertContent] = React.useState<AlgoAlertContent>({ title: "", message: "" });
    const { queue, stack, animate, cancelAnimate, duration, setSuccess, setActivedKey, state, parenthesisMap, setState } = useAlgoContext();
    const [actionDisabled, setActionDisabled] = React.useState(false);

    React.useEffect(() => {
        if (state === State.Typing || state === State.Finished) {
            setActionDisabled(true);
        }
        if (state === State.Playing) {
            setActionDisabled(false);
        }
    }, [state]);

    const clearStack = async () => {
        if (!stack) {
            return;
        }
        stack.emptyShells();
        await stack.empty();
    }

    const clearQueue = async () => {
        if (!queue) {
            return;
        }
        queue.emptyShells();
        await queue.empty();
    }

    const markSuccess = async () => {
        animate();
        await clearStack();
        await clearQueue();
        cancelAnimate();
        setState(State.Finished);
        setSuccess(true);
    };

    const handleAddToStack = async () => {
        if (!queue || !stack) {
            return;
        }

        const temp = await queue.peek();
        if (!temp) {
            setAlertContent({
                title: "Add To Stack Error",
                message: "Already went through all the parentheses."
            });
            setAlertAnchorEl(document.body);
            return;
        }
        if (parenthesisMap.has(temp.value)) {
            setAlertContent({
                title: "Add To Stack Error",
                message: `Map contains "${temp.value}", should call [Remove From Stack].`
            });
            setAlertAnchorEl(document.body);
            return;
        }

        setActionDisabled(true);
        animate();
        const item = await queue.dequeue();
        if (item) {
            await stack.push(item);
        }
        cancelAnimate();
        setActionDisabled(false);

        const next = await queue.peek();
        if (next) {
            setActivedKey(next.value);
        } else {
            setActivedKey(null);
        }
    };

    const handleRemoveFromStack = async () => {
        if (!queue || !stack) {
            return;
        }

        const queueTemp = await queue.peek();
        const stackTemp = await stack.peek();
        if (!stackTemp) {
            setAlertContent({
                title: "Remove From Stack Error",
                message: "Stack is empty, can not remove item from stack."
            });
            setAlertAnchorEl(document.body);
            return;
        }
        if (!queueTemp) {
            setAlertContent({
                title: "Remove From Stack Error",
                message: "Already went through all the parentheses."
            });
            setAlertAnchorEl(document.body);
            return;
        }
        if (stackTemp.value !== parenthesisMap.get(queueTemp.value)) {
            setAlertContent({
                title: "Remove From Stack Error",
                message: `Stack item:[ ${stackTemp.value} ] !== map.get( ${queueTemp.value} )`
            });
            setAlertAnchorEl(document.body);
            return;
        }

        setActionDisabled(true);
        animate();
        const queueItem = await queue.dequeue();
        const stackItem = await stack.pop();
        if (queueItem && stackItem) {
            const position = new THREE.Vector3(
                (queueItem.position.x + stackItem.position.x) / 2,
                (queueItem.position.y + stackItem.position.y) / 2,
                (queueItem.position.z + stackItem.position.z) / 2
            );
            queueItem.move(position, duration);
            stackItem.move(position, duration);
            await wait(duration);
            queueItem.hide();
            stackItem.hide();
            await wait(0.05);
        }

        cancelAnimate();
        setActionDisabled(false);

        const next = await queue.peek();
        if (next) {
            setActivedKey(next.value);
        } else {
            setActivedKey(null);
        }
    };

    const identifyInvalidParentheses = async () => {
        if (!queue || !stack) {
            return;
        }

        const queueTemp = await queue.peek();
        const stackTemp = await stack.peek();

        // Add to stack
        if (queueTemp && !parenthesisMap.has(queueTemp.value)) {
            setAlertContent({
                title: "Identify Invalid Parentheses Error",
                message: `map.has( ${queueTemp.value} ) === false, should [Add to Stack]`
            });
            setAlertAnchorEl(document.body);
            return;
        }

        // Remove from stack
        if (queueTemp && stackTemp) {
            if (stackTemp.value === parenthesisMap.get(queueTemp.value)) {
                setAlertContent({
                    title: "Identify Invalid Parentheses Error",
                    message: `Stack item:[ ${stackTemp.value} ] === map.get( ${queueTemp.value} )`
                });
                setAlertAnchorEl(document.body);
                return;
            }
        }

        // valid parentheses
        if (!queueTemp && !stackTemp) {
            setAlertContent({
                title: "Identify Invalid Parentheses Error",
                message: `This is a valid parentheses.`
            });
            setAlertAnchorEl(document.body);
            return;
        }

        await markSuccess();
    }

    const handleClickSuccess = async () => {
        if (!queue || !stack) {
            return;
        }

        const queueTemp = await queue.peek();
        const stackTemp = await stack.peek();

        if (!queueTemp && !stackTemp) {
            await markSuccess();
        } else {
            setAlertContent({
                title: "Mark Valid Parentheses Failed.",
                message: "Mark Valid Parentheses Failed."
            });
            setAlertAnchorEl(document.body);
        }

    }

    return (
        <div style={{ width: "100%", textAlign: "center", position: "fixed", bottom: "200px" }}>
            <ToggleButtonGroup disabled={actionDisabled}>
                <Tooltip title="Add to Stack" placement="top">
                    <ToggleButton
                        value="AddToQueueIcon"
                        size='large'
                        sx={{ borderColor: "gray" }}
                        onClick={handleAddToStack}
                    >
                        <AddToQueueIcon />
                    </ToggleButton>
                </Tooltip>
                <Tooltip title="Remove from Stack" placement="top">
                    <ToggleButton
                        value="RemoveFromQueueIcon"
                        size='large'
                        sx={{ borderColor: "gray" }}
                        onClick={handleRemoveFromStack}
                    >
                        <RemoveFromQueueIcon />
                    </ToggleButton>
                </Tooltip>
                <Tooltip title="Invalid Parentheses" placement="top">
                    <ToggleButton
                        value="RemoveFromQueueIcon"
                        size='large'
                        sx={{ borderColor: "gray" }}
                        onClick={identifyInvalidParentheses}
                    >
                        <DangerousOutlinedIcon />
                    </ToggleButton>
                </Tooltip>
                <Tooltip title="Valid Parentheses" placement="top">
                    <ToggleButton
                        value="RemoveFromQueueIcon"
                        size='large'
                        sx={{ borderColor: "gray" }}
                        onClick={handleClickSuccess}
                    >
                        <CheckCircleOutlinedIcon />
                    </ToggleButton>
                </Tooltip>
            </ToggleButtonGroup>

            <AlgoAlert anchorEl={alertAnchorEl} setAnchorEl={setAlertAnchorEl} content={alertContent} />
        </div>
    )
};

export default function Algo() {

    const { displayInstructions } = useAlgoContext();

    const [instructionsAnchorEl, setInstructionsAnchorEl] = React.useState<null | HTMLElement>(null);
    React.useEffect(() => {
        if (displayInstructions) {
            setInstructionsAnchorEl(document.body);
        }
    }, [displayInstructions]);

    return (
        <>
            <AlgoMapContainer>
                <AlgoMap />
                <AlgoCode />
            </AlgoMapContainer>

            <Actions />
            <Instructions
                anchorEl={instructionsAnchorEl}
                setAnchorEl={setInstructionsAnchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            />
        </>
    )
}
