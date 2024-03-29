import * as React from 'react';
import OutputIcon from '@mui/icons-material/Output';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { Stack, TextField } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useAlgoContext } from "./AlgoContext";
import { State } from '../AlgoState';
import { clearScene } from "../../../../commons/three";
import { buildList } from "../styles";
import { buildActions } from './algo';

const buildTwoArraies = () => {

    const max = 20;
    const arrayLength = 6;

    const pool: number[] = [];
    for (let i = 0; i < max; i++) {
        pool.push(i);
    }

    const first: number[] = [];
    const second: number[] = [];

    for (let i = 0; i < arrayLength; i++) {
        const randomIndex = Math.floor(Math.random() * pool.length);
        const selectedNumber = pool[randomIndex];
        first.push(selectedNumber);
        pool.splice(randomIndex, 1);
    }

    for (let i = 0; i < arrayLength; i++) {
        const randomIndex = Math.floor(Math.random() * pool.length);
        const selectedNumber = pool[randomIndex];
        second.push(selectedNumber);
        pool.splice(randomIndex, 1);
    }

    first.sort((a, b) => a - b);
    second.sort((a, b) => a - b);

    return [first, second];
}

interface Props {
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}

const Submit: React.FC<{
    nums1: string,
    nums2: string,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}> = ({ nums1, nums2, setAnchorEl }) => {

    const first: number[] = nums1.split(",").map(num => +num);
    const second: number[] = nums2.split(",").map(num => +num);

    const disabled = !nums1 || !nums2 || first.length === 0 || second.length === 0;

    const { setState, animate, cancelAnimate, scene, setActions, setIndex } = useAlgoContext();

    const handleSubmit = async () => {
        setState(State.Typing);
        setAnchorEl(null);
        clearScene(scene);
        setActions([]);

        try {
            animate();
            const head1 = await buildList(scene, first, 9);
            const head2 = await buildList(scene, second, 5);
            const actions = buildActions(head1, head2);
            setActions(actions);
        } catch (error) {
            console.error(error);
        } finally {
            cancelAnimate();
        }

        setIndex(0);
        setState(State.Playing);
    }

    return (
        <IconButton sx={{ p: '10px' }} aria-label="submit input" onClick={handleSubmit} disabled={disabled}>
            <OutputIcon />
        </IconButton>
    );
}

const Main = ({ setAnchorEl }: Props) => {

    const [nums1, setNums1] = React.useState("");
    const [nums2, setNums2] = React.useState("");

    const handleNums1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNums1(e.currentTarget.value);
    }

    const handleNums2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNums2(e.currentTarget.value);
    }

    const handleFresh = () => {
        const [first, second] = buildTwoArraies();
        setNums1(() => first.join(","));
        setNums2(() => second.join(","));
    }

    return (
        <Paper
            variant="elevation"
            elevation={8}
            sx={{
                p: '2px 4px',
                display: 'flex',
                width: 300,
                alignItems: "center"
            }}
        >
            <Stack sx={{ width: "100%", padding: 2 }} direction="column">
                <TextField fullWidth label='List1, seprate by ","' variant="standard" value={nums1} onChange={handleNums1Change} />
                <TextField fullWidth label='List2, seprate by ","' variant="standard" value={nums2} onChange={handleNums2Change} />
                <Stack direction="row" justifyContent="end">
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="clear" onClick={handleFresh}>
                        <RefreshIcon />
                    </IconButton>
                    <Submit nums1={nums1} nums2={nums2} setAnchorEl={setAnchorEl} />
                </Stack>
            </Stack>
        </Paper>
    );
}

export default Main;
