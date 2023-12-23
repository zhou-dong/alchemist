import * as React from 'react';
import OutputIcon from '@mui/icons-material/Output';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { Divider, InputBase } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useAlgoContext } from "./AlgoContext";
import { State } from './AlgoState';
import { LinkedList } from '../../../../data-structures/list/doubly-linked-list/list.three';
import { buildDummyNode } from './styles';
import { wait } from '../../../../data-structures/_commons/utils';

function getRandomInt() {
    const max = 9;
    return Math.floor(Math.random() * max) + 1;
}

const buildNums = () => new Array(10).fill(0).map(() => getRandomInt());

interface Props {
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}

const Submit: React.FC<{
    nums: string,
    target: string,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}> = ({ nums, target, setAnchorEl }) => {

    const { setState, animate, cancelAnimate, scene, setList } = useAlgoContext();

    const handleSubmit = async () => {
        setState(State.Playing);
        setAnchorEl(null);
        try {

            animate();

            const duration = 1;

            const list = new LinkedList<number>(
                scene,
                duration,
                buildDummyNode(scene, "H", -10, 1, 1),
                buildDummyNode(scene, "T", -7, 1, 1),
                "gold"
            );

            setList(list);

            await wait(0.1);
            cancelAnimate();

        } catch (error) {
            console.error(error);
        }
    }

    const disabled = !nums || !target;

    return (
        <IconButton sx={{ p: '10px' }} aria-label="submit input" onClick={handleSubmit} disabled={disabled}>
            <OutputIcon />
        </IconButton>
    );
}

const Main = ({ setAnchorEl }: Props) => {

    const [nums, setNums] = React.useState("");
    const [target, setTarget] = React.useState("");

    const handleNumsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNums(e.currentTarget.value);
    }

    const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTarget(e.currentTarget.value);
    }

    return (
        <Paper
            variant="elevation"
            elevation={8}
            sx={{
                p: '2px 4px',
                display: 'flex',
                width: 350,
                alignItems: "center"
            }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder='nums, seprate by ","'
                value={nums}
                onChange={handleNumsChange}
                type='text'
            />

            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

            <InputBase
                placeholder='val'
                value={target}
                onChange={handleTargetChange}
                type='number'
                inputProps={{ style: { textAlign: 'center' } }}
                sx={{ width: 50 }}
            />

            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

            <IconButton type="button" sx={{ p: '10px' }} aria-label="clear" onClick={() => {
                setNums(() => buildNums().join(", "));
                setTarget(() => getRandomInt() + "");
            }}>
                <RefreshIcon />
            </IconButton>

            <Submit nums={nums} target={target} setAnchorEl={setAnchorEl} />
        </Paper>
    );
}

export default Main;
