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

const Table: React.FC<{ parenthesisMap: Map<string, string> }> = ({ parenthesisMap }) => {
    return (
        <div style={{
            position: "fixed",
            textAlign: "center",
            right: 200,
            top: 112
        }}>
            <AlgoMap parenthesisMap={parenthesisMap} />
        </div>
    );
}

const Actions: React.FC<{ parenthesisMap: Map<string, string> }> = ({ parenthesisMap }) => {

    const [alertAnchorEl, setAlertAnchorEl] = React.useState<null | HTMLElement>(null);
    const [alertContent, setAlertContent] = React.useState<AlgoAlertContent>({ title: "", message: "" });
    const { queue, stack, animate, cancelAnimate, duration, setSuccess } = useAlgoContext();
    const [actionDisabled, setActionDisabled] = React.useState(false);

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
                (queueItem.x + stackItem.x) / 2,
                (queueItem.y + stackItem.y) / 2,
                (queueItem.z + stackItem.z) / 2
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

        const q = await queue.peek();
        const s = await stack.peek();
        if (!q && !s) {
            setSuccess(true);
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
                message: `map.has( ${queueTemp.value} ) === false`
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



        setSuccess(true);
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
            </ToggleButtonGroup>

            <AlgoAlert anchorEl={alertAnchorEl} setAnchorEl={setAlertAnchorEl} content={alertContent} />
        </div>
    )
};

export default function Algo() {

    const { displayActions } = useAlgoContext();
    const parenthesisMap: Map<string, string> = new Map<string, string>();
    parenthesisMap.set(")", "(");
    parenthesisMap.set("]", "[");
    parenthesisMap.set("}", "{");

    const [instructionsAnchorEl, setInstructionsAnchorEl] = React.useState<null | HTMLElement>(null);
    const instructionsRef = React.useRef();

    React.useEffect(() => {
        if (displayActions) {
            setInstructionsAnchorEl(document.body);
        }
    }, [displayActions]);

    const Display = () => (
        <>
            <Actions parenthesisMap={parenthesisMap} />
            <Table parenthesisMap={parenthesisMap} />
            <div style={{ width: "100%", textAlign: "center", position: "fixed", bottom: "200px" }}>
                <ToggleButtonGroup ref={instructionsRef}>123</ToggleButtonGroup>
            </div>
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
    );

    return (
        <>
            {displayActions && <Display />}
        </>
    )
}
