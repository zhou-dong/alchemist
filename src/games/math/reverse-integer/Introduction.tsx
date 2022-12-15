import * as React from 'react';
import ReactMarkdown from "react-markdown";
import MuiStack from '@mui/material/Stack';
import { Divider, Popover, PopoverOrigin, ToggleButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import Instruction from '../../../commons/Instruction';
import { description, examples, formula0, formula1 } from "./contents";
import AlgoInput from "./AlgoInput";
import LightTooltip from '../../../commons/LightTooltip';
import InputIcon from '@mui/icons-material/Input';
import CodeIcon from '@mui/icons-material/Code';
import CodeBlock, { languages } from '../../dp/_components/CodeBlock';

const comments = `/*
(reversed === ~~(max / 10) && digit > max % 10) => (reversed === 214748364 && digit > 7)

If input is an interger, (reversed === 214748364 && digit > 7) will not happened, because reverse of 2147483648 is 8463847412, and 8463847412 > 2147483647.

Same as (reversed === ~~(min / 10) && digit < min % 10), it will not happened too.

So we could simply Solution1 to Solution 2.
*/`;

const Solution = () => (
    <>
        <MuiStack direction="row" >
            <CodeBlock code={formula0} language={languages.Typescript} showLineNumbers={true} />
            <Divider sx={{ height: "370px", m: 0.5 }} orientation="vertical" />
            <CodeBlock code={formula1} language={languages.Typescript} showLineNumbers={true} />
        </MuiStack>
        <CodeBlock code={comments} language={languages.Typescript} />
    </>
);

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

const Main = () => (
    <MuiStack spacing={2} sx={{ position: 'fixed', top: 112, left: 40, zIndex: 1 }}>
        <Input />
        <Instruction
            name="Description"
            icon={<DescriptionOutlinedIcon fontSize="medium" />}
            popover={<StyledReactMarkdown>{description + examples}</StyledReactMarkdown>}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
        />
        <Instruction
            name="Code"
            icon={<CodeIcon fontSize="medium" />}
            popover={<Solution />}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
        />
    </MuiStack>
);

export default Main;
