import * as React from 'react';
import * as THREE from 'three';
import { Alert, AlertTitle, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from '@mui/material';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import RemoveFromQueueIcon from '@mui/icons-material/RemoveFromQueue';
import { useContainer } from "./ContainerContext";
import { wait } from '../../../data-structures/_commons/utils';
import Instructions from "./Instructions";
import AlgoMap from "./AlgoMap";

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

interface AlertContent {
    title: string;
    message: string;
}

interface MessageProps {
    content: AlertContent;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MessageAlert = ({ content, open, setOpen }: MessageProps) => {

    const handleClose = () => {
        setOpen(false);
    };

    const DisplayAlert = () => (
        <div style={{
            width: "100%",
            textAlign: "center",
            position: "fixed",
            bottom: "200px",
        }}>
            <Alert
                variant="filled"
                severity="error"
                sx={{ width: "30%", margin: "auto" }}
                onClose={handleClose}
            >
                <AlertTitle>{content.title}</AlertTitle>
                {content.message}
            </Alert>
        </div>
    );

    return (
        <>
            {open && <DisplayAlert />}
        </>
    );
}

interface ActionsProps {
    parenthesisMap: Map<string, string>;
    setAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setAlertContent: React.Dispatch<React.SetStateAction<AlertContent>>;
};

const Actions = ({ parenthesisMap, setAlertOpen, setAlertContent }: ActionsProps) => {

    const { queue, stack, animate, cancelAnimate, duration } = useContainer();
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
            setAlertOpen(true);
            return;
        }
        if (parenthesisMap.has(temp.value)) {
            setAlertContent({
                title: "Add To Stack Error",
                message: `Map contains "${temp.value}", should call [Remove From Stack].`
            });
            setAlertOpen(true);
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
            setAlertOpen(true);
            return;
        }
        if (!queueTemp) {
            setAlertContent({
                title: "Remove From Stack Error",
                message: "Already went through all the parentheses."
            });
            setAlertOpen(true);
            return;
        }
        if (stackTemp.value !== parenthesisMap.get(queueTemp.value)) {
            setAlertContent({
                title: "Remove From Stack Error",
                message: `Stack item:[ ${stackTemp.value} ] !== map.get( ${queueTemp.value} )`
            });
            setAlertOpen(true);
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
    };

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
            </ToggleButtonGroup>
        </div>
    )
};

export default function Algo() {

    const [alertOpen, setAlertOpen] = React.useState(false);
    const { displayActions } = useContainer();

    const [alertContent, setAlertContent] = React.useState<AlertContent>({ title: "", message: "" });

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
            <Actions
                parenthesisMap={parenthesisMap}
                setAlertOpen={setAlertOpen}
                setAlertContent={setAlertContent}
            />
            <Table parenthesisMap={parenthesisMap} />
            <MessageAlert content={alertContent} open={alertOpen} setOpen={setAlertOpen} />
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
