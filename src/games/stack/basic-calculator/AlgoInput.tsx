import * as React from 'react';
import InputIcon from '@mui/icons-material/Input';
import OutputIcon from '@mui/icons-material/Output';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import { Divider, InputBase, Table, TableBody, TableCell, TableRow } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ClearIcon from '@mui/icons-material/Clear';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { useAlgoContext } from "./AlgoContext";
import { TextCube } from '../../../data-structures/_commons/three/text-cube';
import { Cube } from '../../../data-structures/_commons/three/cube';
import { node, shell } from './stackStyles';
import { State } from './AlgoState';
import StackShellBuilder from './stackShellBuilder';
import StackItemBuilder from './stackItemBuilder';
import Stack from '../../../data-structures/stack';

const DropDown: React.FC<{
    anchorEl: HTMLElement | null,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
    open: boolean,
    setInput: React.Dispatch<React.SetStateAction<string>>
}> = ({ anchorEl, setAnchorEl, open, setInput }) => {

    const buildInInputs = [
        "1 + 1",
        "12 - 3 + 8 + 6",
        "11 + (12 - (3 - (6 + 5 + 2) - 1) + 4)"
    ];

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const Cell: React.FC<{ value: string }> = ({ value }) => (
        <TableCell onClick={() => setInput(current => current + value)}>
            {value}
        </TableCell>
    );

    const Delete = () => (
        <TableCell
            rowSpan={2}
            onClick={() => setInput(current => current.slice(0, current.length - 1))}
            sx={{ padding: 0 }}
        >
            <BackspaceIcon />
        </TableCell>
    );

    return (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
        >
            {
                buildInInputs.map((item, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => {
                            handleMenuClose();
                            setInput(item);
                        }}
                        sx={{ width: "400px", overflow: "hidden" }}
                    >
                        <ListItemIcon>
                            <InputIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>
                            {item}
                        </ListItemText>
                    </MenuItem>
                ))
            }
            <Divider sx={{ my: 0.5 }} />
            <MenuItem sx={{
                "&:hover": {
                    backgroundColor: "#FFF",
                },
                justifyContent: "center"
            }}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <Cell value='1' /><Cell value='2' /><Cell value='3' /><Cell value='+' />
                        </TableRow>
                        <TableRow>
                            <Cell value='4' /><Cell value='5' /><Cell value='6' /><Cell value='-' />
                        </TableRow>
                        <TableRow>
                            <Cell value='7' /><Cell value='8' /><Cell value='9' /><Delete />
                        </TableRow>
                        <TableRow>
                            <Cell value='(' /><Cell value='0' /><Cell value=')' />
                        </TableRow>
                    </TableBody>
                </Table>
            </MenuItem>
        </Menu >
    );
}

const createStackShell = (scene: THREE.Scene): Cube => {
    return new StackShellBuilder(scene, true).build();
}

const createItem = (value: string, scene: THREE.Scene): TextCube<string> => {
    return new StackItemBuilder<string>(value, scene, true).build();
}

const Submit: React.FC<{
    input: string,
    setInput: React.Dispatch<React.SetStateAction<string>>,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}> = ({ input, setInput, setAnchorEl }) => {
    const { stack, scene, animate, cancelAnimate, setState, setSuccess, setIndex, setExpression, minShellSize } = useAlgoContext();

    const handleSubmit = async () => {
        if (!stack) {
            return;
        }
        const expression = input.replace(/\s/g, "");
        if (expression.length === 0) {
            return;
        }
        doSubmit(stack, expression);
    }

    const doSubmit = async (s: Stack<string>, expression: string) => {
        setSuccess(false);
        setState(State.Typing);
        setInput("");
        setAnchorEl(null);
        animate();
        setIndex(0);

        await clearStack(s);
        cancelAnimate();

        setExpression(expression);
        // setActivedKey(characters[0]);
        setState(State.Playing);
    }

    const clearStack = async (s: Stack<string>) => {
        s.emptyShells();
        for (let i = 0; i < minShellSize; i++) {
            s.increaseShells(new StackShellBuilder(scene, true).build());
        }
        await s.empty();
    }

    const disabled = !Boolean(input);
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

    const reference = React.useRef(null);
    const [input, setInput] = React.useState("");

    const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(menuAnchorEl);

    const handleMenuOpen = () => {
        if (reference && reference.current) {
            setMenuAnchorEl(reference.current);
        }
    };

    const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const validCharacters = "0123456789+-()";
        const text: string = e.currentTarget.value;
        let value = "";
        for (let i = 0; i < text.length; i++) {
            const character = text.charAt(i);
            if (validCharacters.includes(character)) {
                value += character;
            }
        }
        setInput(value);
    }

    return (
        <>
            <Paper
                ref={reference}
                variant="elevation"
                elevation={8}
                sx={{
                    p: '2px 4px',
                    display: 'flex',
                    width: 392,
                    alignItems: "center"
                }}
            >
                <IconButton sx={{ p: '10px' }} aria-label="menu" onClick={handleMenuOpen}>
                    <KeyboardArrowDownIcon />
                </IconButton>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Input Parentheses"
                    inputProps={{ 'aria-label': 'Input Parentheses' }}
                    value={input}
                    onChange={handleTextFieldChange}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="clear" onClick={() => setInput("")}>
                    <ClearIcon />
                </IconButton>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <Submit input={input} setInput={setInput} setAnchorEl={setAnchorEl} />
            </Paper>

            <DropDown
                anchorEl={menuAnchorEl}
                setAnchorEl={setMenuAnchorEl}
                open={open}
                setInput={setInput}
            />
        </>
    );
}
