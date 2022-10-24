import * as React from 'react';
import ReactMarkdown from "react-markdown";
import MuiStack from '@mui/material/Stack';
import { PopoverOrigin, ToggleButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CodeIcon from '@mui/icons-material/Code';
import Instruction from '../../../commons/Instruction';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import CodeBlock, { languages } from '../../dp/_components/CodeBlock';
import { description, formula } from "./contents";
import LightTooltip from '../../../commons/LightTooltip';

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

const Refresh = () => {

    const handleClick = () => {
        console.log("refresh");
    }

    return (
        <LightTooltip title="Refresh" placement="right">
            <ToggleButton
                onChange={handleClick}
                size="large"
                sx={{ borderRadius: "50%" }}
                value="refresh"
            >
                <RefreshOutlinedIcon fontSize="medium" />
            </ToggleButton>
        </LightTooltip>
    );
}

const Instructions = () => {
    const [highLightLine, setHighLightLine] = React.useState<number[]>([]);

    return (
        <MuiStack spacing={2} sx={{ position: 'fixed', top: 112, left: 40 }}>
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
                    linesToHighlight={highLightLine}
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
