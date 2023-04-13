import * as React from 'react';
import OutputIcon from '@mui/icons-material/Output';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { Divider, InputBase, } from '@mui/material';
import { State } from './AlgoState';
import { useAlgoContext } from "./AlgoContext";
import { clearScene } from '../../../commons/three';
import { wait } from '../../../data-structures/_commons/utils';
import { buildMinHeap } from './styles';

const Submit: React.FC<{
    n: string,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}> = ({ n, setAnchorEl }) => {
    const { scene, animate, cancelAnimate, setState, setMinHeap, setResult, setN, setSeen } = useAlgoContext();

    const disabled = n.trim().length === 0;

    const handleSubmit = async () => {
        setState(State.Typing);
        setAnchorEl(null);
        setSeen(new Set());
        setN(+n);
        setResult(undefined);
        animate();
        clearScene(scene);
        const minHeap = buildMinHeap(+n * 1.5, scene);
        setMinHeap(minHeap);
        await wait(0.2);
        cancelAnimate();
        setState(State.BuildingHeap);
    }

    return (
        <IconButton sx={{ p: '10px' }} aria-label="submit input" onClick={handleSubmit} disabled={disabled}>
            <OutputIcon />
        </IconButton>
    );
}

interface Props {
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}

export default function AlgoInput({ setAnchorEl }: Props) {

    const [n, setN] = React.useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = +(e.currentTarget.value);
        if (value > 0) {
            setN(e.currentTarget.value);
        }
    };

    return (
        <Paper
            variant="elevation"
            elevation={8}
            sx={{
                p: '2px 4px',
                display: 'flex',
                width: 150,
                alignItems: "center",
                padding: "3px"
            }}
        >
            <InputBase
                placeholder='n'
                value={n}
                onChange={handleChange}
                type="number"
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <Submit n={n} setAnchorEl={setAnchorEl} />
        </Paper>
    );
}
