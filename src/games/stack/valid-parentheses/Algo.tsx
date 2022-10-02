import * as React from 'react';
import * as THREE from 'three';
import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import RemoveFromQueueIcon from '@mui/icons-material/RemoveFromQueue';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { useContainer } from "./ContainerContext";
import { wait } from '../../../data-structures/_commons/utils';

// private buildStackShell() {
//     const shell = new StackAlgo<Cube>();
//     const { material, position, size } = this.shellParams;
//     const { width, height, depth } = this.nodeSize;
//     const { x, y, z } = position;
//     for (let i = 0; i < size; i++) {
//         const geometry = new THREE.BoxGeometry(width, height, depth)
//         const cube = new Cube(geometry, material, this.scene);
//         cube.x = x - width * i;
//         cube.y = y;
//         cube.z = z;
//         cube.show();
//         shell.push(cube);
//     }
// }

const Actions = () => {

    const { queue, stack, animate, cancelAnimate, duration, displayActions } = useContainer();
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

    return (
        <div style={{ width: "100%", textAlign: "center", position: "fixed", bottom: "100px" }}>

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
                        value="invalid"
                        size='large'
                        sx={{ borderColor: "gray" }}
                    >
                        <DangerousIcon />
                    </ToggleButton>
                </Tooltip>

            </ToggleButtonGroup>

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
