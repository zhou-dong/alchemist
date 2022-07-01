import * as React from 'react';
import { Divider, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { AssignmentOutlined } from '@mui/icons-material';

const StyledReactMarkdown = styled(ReactMarkdown)(() => ({
    fontSize: "16px",
    "& table": {
        borderCollapse: "collapse",
        border: "1px solid black",
    },
    "& th": {
        border: "1px solid black",
    },
    "& td": {
        border: "1px solid black",
    },
}));

export interface Props {
    readonly success: boolean;
    readonly title: string;
    readonly example: string;
    readonly usecases: string;
    readonly description: string;
}

const description = ({ description, title }: Props) => (
    <>
        <Typography>{title}</Typography>
        <Divider />
        <StyledReactMarkdown>{description}</StyledReactMarkdown>
    </>
);

const Usecases = ({ usecases }: Props) => (
    <React.Fragment>
        <Typography>Use Cases</Typography>
        <Divider />
        <StyledReactMarkdown>{usecases}</StyledReactMarkdown>
    </React.Fragment>
);

const example = ({ example }: Props) => (
    <React.Fragment>
        <Typography>Examples</Typography>
        <Divider />
        <StyledReactMarkdown remarkPlugins={[gfm]}>{example}</StyledReactMarkdown>
    </React.Fragment>
);

const Main = (props: Props) => {
    const [openDescription, setOpenDescription] = React.useState(false);
    const handleOpenDescription = () => setOpenDescription(true);
    const handleCloseDescription = () => setOpenDescription(false);

    return (
        <>
            <Tooltip title="Description" placement="top">
                <IconButton onClick={handleOpenDescription}>
                    <AssignmentOutlined />
                </IconButton>
            </Tooltip>
            <Dialog open={openDescription} onClose={handleCloseDescription} scroll="paper" maxWidth="xl">
                <DialogContent>
                    {props.description && description(props)}
                    {props.usecases && Usecases(props)}
                    {props.example && example(props)}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDescription}>CLOSE</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Main;
