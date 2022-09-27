import * as React from 'react';
import InputIcon from '@mui/icons-material/Input';
import OutputIcon from '@mui/icons-material/Output';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import { Button, ButtonGroup, Divider, InputBase } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ClearIcon from '@mui/icons-material/Clear';
import BackspaceIcon from '@mui/icons-material/Backspace';

const buildInInputs = [
    { label: "( ) [ ] { }", value: "()[]{}" },
    { label: "{ [ ( ) ] }", value: "{[()]}" },
    { label: "{ [ ( ) ( ) ] }", value: "{[()()]}" }
];

export default function BasicSpeedDial() {

    const reference = React.useRef(null);
    const [input, setInput] = React.useState("");

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = () => {
        if (reference && reference.current) {
            setAnchorEl(reference.current);
        }

    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const validCharacters = "{}[]()";
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
                    width: 300,
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
                <IconButton color="primary" sx={{ p: '10px' }} aria-label="submit input">
                    <OutputIcon />
                </IconButton>
            </Paper>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
            >
                {
                    buildInInputs.map(({ label, value }, index) => (
                        <MenuItem
                            key={index}
                            onClick={() => {
                                handleMenuClose();
                                setInput(value);
                            }}>
                            <ListItemIcon>
                                <InputIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>
                                {label}
                            </ListItemText>
                        </MenuItem>
                    ))
                }
                <Divider sx={{ my: 0.5 }} />
                <MenuItem sx={{ width: "308px", overflow: "hidden" }}>
                    <ButtonGroup variant="outlined" aria-label="valid parentheses input" size="small">
                        <Button onClick={() => setInput(current => current + "(")}>(</Button>
                        <Button onClick={() => setInput(current => current + ")")}>)</Button>
                        <Button onClick={() => setInput(current => current + "[")}>[</Button>
                        <Button onClick={() => setInput(current => current + "]")}>]</Button>
                        <Button onClick={() => setInput(current => current + "{")}>{"{"}</Button>
                        <Button onClick={() => setInput(current => current + "}")}>{"}"}</Button>

                        <Button endIcon={<BackspaceIcon />} onClick={() => {
                            setInput(current => current.slice(0, current.length - 1))
                        }}>
                        </Button>
                    </ButtonGroup>

                </MenuItem>
            </Menu>
        </>
    );
}
