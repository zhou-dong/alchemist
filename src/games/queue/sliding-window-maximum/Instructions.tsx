import * as React from 'react';
import ReactMarkdown from "react-markdown";
import MuiStack from '@mui/material/Stack';
import { capitalize, Popover, PopoverOrigin, ToggleButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CodeIcon from '@mui/icons-material/Code';
import Instruction from '../../../commons/Instruction';
import CodeBlock, { languages } from '../../dp/_components/CodeBlock';
import { description, formula } from "./contents";
import LightTooltip from '../../../commons/LightTooltip';
import AlgoInput from './AlgoInput';
import InputIcon from '@mui/icons-material/Input';

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

const Instructions = () => {
    return (
        <MuiStack spacing={2} sx={{ position: 'fixed', top: 112, left: 40 }}>
            <Input />
            <Instruction
                name="Description"
                icon={<DescriptionOutlinedIcon fontSize="medium" />}
                popover={<StyledReactMarkdown>{description}</StyledReactMarkdown>}
                anchorOrigin={anchorOrigin}
                transformOrigin={transformOrigin}
            />
            <Instruction
                name="Code"
                icon={<CodeIcon fontSize="medium" />}
                popover={<CodeBlock
                    code={formula}
                    language={languages.Typescript}
                    showLineNumbers={true}
                    linesToHighlight={[]}
                    wrapLines={true}
                />}
                anchorOrigin={anchorOrigin}
                transformOrigin={transformOrigin}
            />
        </MuiStack>
    );
}

export default Instructions;
