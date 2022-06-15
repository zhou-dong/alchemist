import * as React from 'react';
import { Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ReactMarkdown from "react-markdown";

const StyledReactMarkdown = styled(ReactMarkdown)(({ }) => ({
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
    readonly title: string;
    readonly dialogOpen: boolean;
    readonly example: string;
    readonly alUsecases: string;
    readonly description: string;
    readonly handleDialogOnClose?: () => any;
    readonly handleCloseDialogClick: () => any;
}

const description = ({ description }: Props) => (
    <StyledReactMarkdown>{description}</StyledReactMarkdown>
);

const alUsecases = ({ alUsecases }: Props) => (
    <React.Fragment>
        <Typography>Use Cases</Typography>
        <Divider />
        <StyledReactMarkdown>{alUsecases}</StyledReactMarkdown>
    </React.Fragment>
);

const example = ({ example }: Props) => (
    <React.Fragment>
        <Typography>Example</Typography>
        <Divider />
        <StyledReactMarkdown>{example}</StyledReactMarkdown>
    </React.Fragment>
);

const InfoModal = (props: Props) => (
    <Dialog open={props.dialogOpen} onClose={props.handleDialogOnClose} scroll="paper" >
        <DialogTitle>
            <Typography>{props.title}</Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
            {props.description && description(props)}
            {props.alUsecases && alUsecases(props)}
            {props.example && example(props)}
        </DialogContent>
        <DialogActions>
            <Button onClick={props.handleCloseDialogClick}>CLOSE</Button>
        </DialogActions>
    </Dialog>
);

export default InfoModal;
