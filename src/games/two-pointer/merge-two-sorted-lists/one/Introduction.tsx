import * as React from 'react';
import ReactMarkdown from "react-markdown";
import MuiStack from '@mui/material/Stack';
import { Paper, Popover, PopoverOrigin, ToggleButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CodeIcon from '@mui/icons-material/Code';
import Instruction from '../../../../commons/Instruction';
import { description, examples } from "../description";
import AlgoInput from "./AlgoInput";
import LightTooltip from '../../../../commons/LightTooltip';
import InputIcon from '@mui/icons-material/Input';
import CodeBlock, { languages } from '../../../dp/_components/CodeBlock';
import Draggable from 'react-draggable';
import { useAlgoContext } from './AlgoContext';

const capitalize = (name: string): string => {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

const anchorOrigin: PopoverOrigin = {
    vertical: 'center',
    horizontal: 'right',
};

const transformOrigin: PopoverOrigin = {
    vertical: 'center',
    horizontal: 'left',
};

const StyledReactMarkdown = styled(ReactMarkdown)(() => ({
    fontSize: "16px",
    marginTop: 0,
    paddingTop: 0,
    paddingLeft: 10,
    paddingRight: 10,
}));

const Input = () => {

    const name = "input";
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
        anchorEl ? setAnchorEl(null) : setAnchorEl(event.currentTarget);
    }

    const reference = React.useRef(null);

    React.useEffect(() => {
        setAnchorEl(reference.current);
    }, [reference])

    return (
        <>
            <LightTooltip title={capitalize(name)} placement="right">
                <ToggleButton
                    ref={reference}
                    onChange={handleToggle}
                    aria-label={name}
                    size="large"
                    sx={{ borderRadius: "50%" }}
                    value={name}
                    selected={open}
                >
                    <InputIcon fontSize="medium" />
                </ToggleButton>
            </LightTooltip>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={anchorOrigin}
                transformOrigin={transformOrigin}
            >
                <AlgoInput setAnchorEl={setAnchorEl} />
            </Popover>
        </>
    )
}

const formula = `function mergeTwoLists(list1, list2) {

    if (!list1) {
        return list2;
    }

    if (!list2) {
        return list1;
    }

    if (list1.val < list2.val) {
        const next = mergeTwoLists(list1.next, list2);
        list1.next = next;
        return list1;
    }

    const next = mergeTwoLists(list1, list2.next);
    list2.next = next;
    return list2;
};`;

const CodeDisplay = () => {
    const { index, actions } = useAlgoContext();
    const action = actions[index - 1];
    const linesToHighlight: number[] = action ? action.linesToHighlight : [];

    return (
        <div style={{ position: 'fixed', top: 330, left: 40, zIndex: 2 }}>
            <Draggable>
                <Paper elevation={8} sx={{ cursor: 'pointer' }}>
                    <CodeBlock
                        code={formula}
                        language={languages.Typescript}
                        showLineNumbers={true}
                        linesToHighlight={linesToHighlight}
                        wrapLines={true}
                    />
                </Paper>
            </Draggable>
        </div>
    );
}

const Main = () => {

    const [displayCode, setDisplayCode] = React.useState(true);

    const handleCodeDisplayToggle = () => {
        setDisplayCode(isOpen => !isOpen);
    }

    return (
        <>
            <MuiStack spacing={2} sx={{ position: 'fixed', top: 112, left: 40, zIndex: 1 }}>
                <Input />
                <Instruction
                    name="Description"
                    icon={<DescriptionOutlinedIcon fontSize="medium" />}
                    popover={<StyledReactMarkdown>{description + examples}</StyledReactMarkdown>}
                    anchorOrigin={anchorOrigin}
                    transformOrigin={transformOrigin}
                />
                <LightTooltip title="code" placement="right">
                    <ToggleButton
                        // ref={null as any}
                        onChange={handleCodeDisplayToggle}
                        size="large"
                        sx={{ borderRadius: "50%" }}
                        value="code"
                        selected={displayCode}
                    >
                        <CodeIcon fontSize="medium" />
                    </ToggleButton>
                </LightTooltip>
            </MuiStack>

            {displayCode && <CodeDisplay />}
        </>
    )
};

export default Main;
