import * as React from 'react';
import OutputIcon from '@mui/icons-material/Output';
import IconButton from '@mui/material/IconButton';
import InputIcon from '@mui/icons-material/Input';
import Paper from '@mui/material/Paper';
import { InputBase } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useAlgoContext } from "./AlgoContext";
import { State } from './AlgoState';
import { clearScene } from "../../../commons/three";
import { buildList, center, skinEnabledColor } from "./styles";
import ClearIcon from '@mui/icons-material/Clear';
import { wait } from '../../../data-structures/_commons/utils';
import { safeRun } from '../../commons/utils';

const buildRandomList = (length: number): number[] => {
    const max = 10;

    const list: number[] = [];
    for (let i = 0; i < length; i++) {
        const random = Math.floor(Math.random() * max) + 1;
        list.push(random);
    }

    const result = list.map(n => n + 1);
    result.sort((a, b) => a - b);
    return result;
}

interface Props {
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}

const Submit: React.FC<{
    list: string,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}> = ({ list, setAnchorEl }) => {

    const nums: number[] = list.split(",").map(num => +num);

    const disabled = !list || nums.length === 0;

    const { setState, animate, cancelAnimate, scene, setHead, setCurrent, setLinesToHighlight } = useAlgoContext();

    const handleSubmit = async () => {
        setState(State.Typing);
        setAnchorEl(null);
        clearScene(scene);
        setLinesToHighlight([2]);

        const init = async () => {
            const x = -8;
            const y = 7;
            const head = await buildList(scene, nums, x, y);
            head.nodeSkin.color = skinEnabledColor;
            await center(head);
            setHead(head);
            setCurrent(head);
            await wait(0.1);
        }

        await safeRun(init, animate, cancelAnimate);
        setState(State.Playing);
    }

    return (
        <IconButton sx={{ p: '10px' }} aria-label="submit input" onClick={handleSubmit} disabled={disabled}>
            <OutputIcon />
        </IconButton>
    );
}

const Main = ({ setAnchorEl }: Props) => {

    const listLength = (): number => {
        const random = Math.random();
        return random > 0.5 ? 7 : 6;
    }

    const [list, setList] = React.useState(() => buildRandomList(listLength()).join(","));

    const handleListChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setList(e.currentTarget.value);
    }

    const handleFresh = () => {
        setList(() => buildRandomList(listLength()).join(","));
    }

    return (
        <Paper
            variant="elevation"
            elevation={8}
            sx={{
                p: '2px 4px',
                display: 'flex',
                width: 360,
                alignItems: "center"
            }}
        >
            <IconButton sx={{ p: '10px' }} aria-label="menu">
                <InputIcon />
            </IconButton>

            <InputBase
                sx={{ ml: 1, flex: 1, }}
                placeholder='list, seprate by ","'
                value={list}
                onChange={handleListChange}
            />

            <IconButton sx={{ p: '10px' }} aria-label="menu" onClick={handleFresh}>
                <RefreshIcon />
            </IconButton>

            <IconButton
                type="button"
                sx={{ p: '10px' }}
                aria-label="clear"
                disabled={!list.length}
                onClick={() => {
                    setList("");
                }}
            >
                <ClearIcon />
            </IconButton>

            <Submit list={list} setAnchorEl={setAnchorEl} />
        </Paper>
    );
}

export default Main;
