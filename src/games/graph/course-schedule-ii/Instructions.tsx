import ReactMarkdown from "react-markdown";
import MuiStack from '@mui/material/Stack';
import { Popover, PopoverOrigin, ToggleButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CodeIcon from '@mui/icons-material/Code';
import Instruction from '../../../commons/Instruction';
import RefreshIcon from '@mui/icons-material/Refresh';
import CodeBlock, { languages } from '../../dp/_components/CodeBlock';
import { description, formula } from "./contents";
import React from "react";
import LightTooltip from "../../../commons/LightTooltip";
import AlgoInput from "./AlgoInput";
import InputIcon from '@mui/icons-material/Input';
import { wait } from "../../../data-structures/_commons/utils";
import { useAlgoContext } from "./AlgoContext";
import { State } from "./AlgoState";
import { forceAtlas2Layout } from '../../../data-structures/graph/utils';

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

const Refresh = () => {

    const { animate, cancelAnimate, state, graph } = useAlgoContext();

    const disabled: boolean = !graph || state !== State.Playing;

    const handleRefresh = () => {
        if (!graph) {
            return;
        }
        graph.setPositions(forceAtlas2Layout);
        try {
            animate();
            wait(0.2);
        } catch (error) {
            console.log(error);
        }
        cancelAnimate();
    }

    const name = "refresh";

    return (
        <ToggleButton
            aria-label={name}
            size="large"
            sx={{ borderRadius: "50%" }}
            value={name}
            disabled={disabled}
            onClick={handleRefresh}
        >
            <RefreshIcon fontSize="medium" color="primary" />
        </ToggleButton>
    )
}


const Instructions = () => {
    return (
        <MuiStack spacing={2} sx={{ position: 'fixed', top: 112, left: 40, zIndex: 1 }}>
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
            <Refresh />
        </MuiStack>
    );
}

export default Instructions;
