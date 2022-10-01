import * as React from 'react';
import DescriptionIcon from '@mui/icons-material/Description';
import CodeIcon from '@mui/icons-material/Code';
import { Popover, ToggleButton } from '@mui/material';
import MuiStack from '@mui/material/Stack';
import InputIcon from '@mui/icons-material/Input';
import AlgoInput from "./AlgoInput";
import { description, formula } from "./contents";
import ReactMarkdown from "react-markdown";
import { styled } from '@mui/material/styles';
import CodeBlock, { languages } from '../../dp/_components/CodeBlock';

const StyledReactMarkdown = styled(ReactMarkdown)(() => ({
    fontSize: "16px",
    marginTop: 0,
    paddingTop: 0,
    paddingLeft: 10,
    paddingRight: 10,
}));

const Item: React.FC<{
    defaultOpen: boolean,
    name: string,
    icon: JSX.Element,
    popover: JSX.Element
}> = ({ icon, popover, name, defaultOpen }) => {

    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
        if (anchorEl) {
            setAnchorEl(null);
        } else {
            setAnchorEl(event.currentTarget);
        }
    }

    const reference = React.useRef(null);

    React.useEffect(() => {
        if (defaultOpen) {
            setAnchorEl(reference.current);
        }
    }, [reference])

    return (
        <>
            <ToggleButton
                ref={reference}
                onChange={handleToggle}
                aria-label={name}
                size="large"
                sx={{ borderRadius: "50%" }}
                value={name}
                selected={open}
                color="primary"
            >
                {icon}
            </ToggleButton>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
            >
                {popover}
            </Popover>
        </>
    )
}

export default function BasicSpeedDial() {
    return (
        <>
            <MuiStack spacing={2} sx={{ position: 'fixed', top: 112, left: 40 }}>

                <Item
                    name="input"
                    icon={<InputIcon fontSize="medium" />}
                    popover={<AlgoInput />}
                    defaultOpen={true}
                />

                <Item
                    name="description"
                    icon={<DescriptionIcon fontSize="medium" />}
                    popover={<StyledReactMarkdown>{description}</StyledReactMarkdown>}
                    defaultOpen={false}
                />

                <Item
                    name="code"
                    icon={<CodeIcon fontSize="medium" />}
                    popover={<CodeBlock code={formula} language={languages.Javascript} />}
                    defaultOpen={false}
                />
            </MuiStack>
        </>
    );
}
