import * as React from 'react';
import * as THREE from 'three';
import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import RemoveFromQueueIcon from '@mui/icons-material/RemoveFromQueue';
import { useContainer } from "./ContainerContext";
import { wait } from '../../../data-structures/_commons/utils';
import Instructions from "./Instructions";

const Actions = () => {

    const [instructionsAnchorEl, setInstructionsAnchorEl] = React.useState<null | HTMLElement>(null);
    const { queue, stack, animate, cancelAnimate, duration } = useContainer();
    const [actionDisabled, setActionDisabled] = React.useState(false);

    const handleAddToStack = async () => {
        if (!queue || !stack) {
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

    const instructionsRef = React.useRef();
    React.useEffect(() => {
        if (instructionsRef && instructionsRef.current) {
            setInstructionsAnchorEl(instructionsRef.current)
        }
    }, [instructionsRef]);


    return (
        <div style={{ width: "100%", textAlign: "center", position: "fixed", bottom: "200px" }}>

            <ToggleButtonGroup
                ref={instructionsRef}
                disabled={actionDisabled}
            >
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
        </div>
    )
}

export default function Algo() {
    const { displayActions } = useContainer();
    return (
        <>
            {displayActions && <Actions />}
        </>
    )
}
