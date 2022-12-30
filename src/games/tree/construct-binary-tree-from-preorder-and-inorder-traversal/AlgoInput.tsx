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
import { State } from './AlgoState';
import { buildTree } from "./algo";

const inputOne = {
    preorder: [1, 2, 4, 8, 9, 10, 11, 5, 3, 6, 7],
    inorder: [8, 4, 10, 9, 11, 2, 5, 1, 6, 3, 7]
}

const DropDown: React.FC<{
    anchorEl: HTMLElement | null,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
    open: boolean,
    setInput: React.Dispatch<React.SetStateAction<string>>
}> = ({ anchorEl, setAnchorEl, open, setInput }) => {

    const buildInInputs = [
        "1 + 2 * 3",
        "1 + 2 * 3 / 4",
        "11 + 2 - 3 * 4 * 5 / 6 + 7 - 8"
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
                            <Cell value='*' /><Cell value='0' /><Cell value='/' />
                        </TableRow>
                    </TableBody>
                </Table>
            </MenuItem>
        </Menu >
    );
}

const Submit: React.FC<{
    input: string,
    setInput: React.Dispatch<React.SetStateAction<string>>,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}> = ({ input, setInput, setAnchorEl }) => {
    const { scene, animate, cancelAnimate, setState, setInputOutput, setIndex } = useAlgoContext();

    const handleSubmit = async () => {

        doSubmit()

        const expression = input.replace(/\s/g, "");
        if (expression.length === 0) {
            return;
        }
    }

    const doSubmit = async () => {

        const { preorder, inorder } = inputOne;

        setInputOutput(buildTree(preorder, inorder));
        setIndex(0);

        setState(State.Typing);
        setInput("");
        setAnchorEl(null);

        animate();

        cancelAnimate();
        setState(State.Playing);
    }


    let disabled = !Boolean(input);
    disabled = false;
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
        const validCharacters = "0123456789+-*/";
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
