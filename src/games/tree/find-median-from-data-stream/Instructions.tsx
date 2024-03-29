import ReactMarkdown from "react-markdown";
import MuiStack from '@mui/material/Stack';
import { PopoverOrigin } from '@mui/material';
import { styled } from '@mui/material/styles';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CodeIcon from '@mui/icons-material/Code';
import Instruction from '../../../commons/Instruction';
import CodeBlock, { languages } from '../../dp/_components/CodeBlock';
import { description, example, heap, medianFinder } from "./contents";

const anchorOrigin: PopoverOrigin = {
    vertical: 'center',
    horizontal: 'right',
};

const transformOrigin: PopoverOrigin = {
    vertical: 'center',
    horizontal: 'left',
};

const StyledReactMarkdown = styled(ReactMarkdown)(() => ({
    maxWidth: "600px",
    fontSize: "16px",
    marginTop: 0,
    paddingTop: 0,
    paddingLeft: 10,
    paddingRight: 10,
}));

const Instructions = () => {
    return (
        <MuiStack spacing={2} sx={{ position: 'fixed', top: 112, left: 40, zIndex: 1 }}>
            <Instruction
                name="Description"
                icon={<DescriptionOutlinedIcon fontSize="medium" />}
                popover={<StyledReactMarkdown>{description + example}</StyledReactMarkdown>}
                anchorOrigin={anchorOrigin}
                transformOrigin={transformOrigin}
            />
            <Instruction
                name="Heap"
                icon={<CodeIcon fontSize="medium" />}
                popover={<CodeBlock
                    code={heap}
                    language={languages.Typescript}
                    showLineNumbers={true}
                    linesToHighlight={[]}
                    wrapLines={true}
                />}
                anchorOrigin={anchorOrigin}
                transformOrigin={transformOrigin}
            />
            <Instruction
                name="MedianFinder"
                icon={<CodeIcon fontSize="medium" />}
                popover={<CodeBlock
                    code={medianFinder}
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
