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
import { useContainer } from "./ContainerContext";
import { TextCube } from '../../../data-structures/_commons/three/text-cube';
import { nodeParams } from './styles';

const DropDown: React.FC<{
    anchorEl: HTMLElement | null,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
    open: boolean,
    setInput: React.Dispatch<React.SetStateAction<string>>
}> = ({ anchorEl, setAnchorEl, open, setInput }) => {

    const buildInInputs = [
        { label: "( ) [ ] { }", value: "()[]{}" },
        { label: "{ [ ( ) ] }", value: "{[()]}" },
        { label: "{ [ ( ) ( ) ] }", value: "{[()()]}" }
    ];

    const parentheses = "()[]{}";

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
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
                    {
                        Array.from(parentheses).map((parenthese, index) =>
                            <Button key={index} onClick={() => setInput(current => current + parenthese)}>
                                {parenthese}
                            </Button>
                        )
                    }
                    <Button
                        endIcon={<BackspaceIcon />}
                        onClick={() => setInput(current => current.slice(0, current.length - 1))}
                    >
                    </Button>
                </ButtonGroup>
            </MenuItem>
        </Menu>
    );
}

const createItem = (value: string, scene: THREE.Scene): TextCube<string> => {
    const { textMaterial, textGeometryParameters, cubeMaterial, cubeGeometry, initPosition } = nodeParams;

    const item = new TextCube<string>(value, textMaterial, textGeometryParameters, cubeMaterial, cubeGeometry, scene);

    item.x = initPosition.x;
    item.y = initPosition.y;
    item.z = initPosition.z;

    item.textX = item.x - 0.1;
    item.textY = item.y - 0.26;
    item.textZ = initPosition.z;

    return item;
}

const Submit: React.FC<{ input: string, setInput: React.Dispatch<React.SetStateAction<string>> }> = ({ input, setInput }) => {
    const { stack, queue, scene, animate, cancelAnimate } = useContainer();

    const disabled = !Boolean(input);

    const handleSubmit = async () => {
        if (!queue || !stack) {
            return;
        }
        const characters = Array.from(input);
        animate();
        for (let i = 0; i < characters.length; i++) {
            const character = characters[i];
            const item = createItem(character, scene);
            item.show();
            await queue.enqueue(item)
        }
        cancelAnimate();

        setInput("");
    }

    return (
        <IconButton color="primary" sx={{ p: '10px' }} aria-label="submit input" onClick={handleSubmit} disabled={disabled}>
            <OutputIcon />
        </IconButton>
    );
}

export default function AlgoInput() {

    const reference = React.useRef(null);
    const [input, setInput] = React.useState("");

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = () => {
        if (reference && reference.current) {
            setAnchorEl(reference.current);
        }
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
                <Submit input={input} setInput={setInput} />
            </Paper>

            <DropDown
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                open={open}
                setInput={setInput}
            />
        </>
    );
}
