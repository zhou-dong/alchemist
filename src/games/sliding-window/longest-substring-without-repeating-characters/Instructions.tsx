import * as React from 'react';
import ReactMarkdown from "react-markdown";
import Stack from '@mui/material/Stack';
import { Popover, PopoverOrigin, ToggleButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import Instruction from '../../../commons/Instruction';
import AlgoInput from "./AlgoInput";
import LightTooltip from '../../../commons/LightTooltip';
import InputIcon from '@mui/icons-material/Input';
import CodeIcon from '@mui/icons-material/Code';
import CodeBlock, { languages } from '../../dp/_components/CodeBlock';
import { description, formula } from "./contents";
import Switcher from './Switcher';
import { IndexProps, LeftProps, RangeProps } from './InputTable';

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

interface Props {
    setInput: React.Dispatch<React.SetStateAction<string>>;
    setIndex: React.Dispatch<React.SetStateAction<IndexProps>>;
    setLeft: React.Dispatch<React.SetStateAction<LeftProps>>;
    setRange: React.Dispatch<React.SetStateAction<RangeProps>>
    setMap: React.Dispatch<React.SetStateAction<Map<string, number>>>;
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
    setMax: React.Dispatch<React.SetStateAction<number>>;
    alignment: string;
    setAlignment: React.Dispatch<React.SetStateAction<string>>;
}

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

const SwitcherWrapper = styled("div")(() => ({
    position: "fixed",
    top: 100,
    left: 20,
}));

const Main = ({ setInput, setRange, setMap, setIndex, setLeft, setSuccess, setMax, alignment, setAlignment }: Props) => (
    <>
        <SwitcherWrapper>
            <Switcher />
        </SwitcherWrapper>
        <Stack spacing={2} sx={{ position: 'fixed', top: 168, left: 40, zIndex: 1 }}>
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
        </Stack>
    </>
);

export default Main;
