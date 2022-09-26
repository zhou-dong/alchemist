import * as React from 'react';
import DescriptionIcon from '@mui/icons-material/Description';
import CodeIcon from '@mui/icons-material/Code';
import { Popover, ToggleButton } from '@mui/material';
import Stack from '@mui/material/Stack';
import InputIcon from '@mui/icons-material/Input';
import AlgoInput from "./AlgoInput";
import { description, formula } from "./contents";
import ReactMarkdown from "react-markdown";
import { styled } from '@mui/material/styles';
import CodeBlock, { languages } from '../../dp/_components/CodeBlock';

const StyledReactMarkdown = styled(ReactMarkdown)(() => ({
    fontSize: "16px",
    paddingLeft: 10,
    paddingRight: 10,
}));

const Item: React.FC<{
    name: string,
    icon: JSX.Element,
    popover: JSX.Element
}> = ({ icon, popover, name }) => {

    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
        if (anchorEl) {
            setAnchorEl(null);
        } else {
            setAnchorEl(event.currentTarget);
        }
    }

    return (
        <>
            <ToggleButton
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
            <Stack spacing={2} sx={{ position: 'fixed', top: 92, left: 40 }}>

                <Item
                    name="input"
                    icon={<InputIcon fontSize="medium" />}
                    popover={<AlgoInput />}
                />

                <Item
                    name="description"
                    icon={<DescriptionIcon fontSize="medium" />}
                    popover={<StyledReactMarkdown>{description}</StyledReactMarkdown>}
                />

                <Item
                    name="code"
                    icon={<CodeIcon fontSize="medium" />}
                    popover={<CodeBlock code={formula} language={languages.Javascript} />}
                />
            </Stack>
        </>

    );
}
