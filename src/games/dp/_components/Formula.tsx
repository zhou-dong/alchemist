import * as React from 'react';
import { IconButton, Tooltip, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';

import CodeBlock, { languages } from './CodeBlock';
import CodeIcon from '@mui/icons-material/Code';

export interface Props {
    readonly title: string;
    readonly formula: string;
}

const StyledTitle = styled(DialogTitle)(({ theme }) => ({
    padding: theme.spacing(1),
    paddingBottom: 0,
}));

const Main = (props: Props) => {
    const [openFormular, setOpenFormular] = React.useState(false);
    const handleOpenFormular = () => setOpenFormular(true);
    const handleCloseFormular = () => setOpenFormular(false);

    return (
        <>
            <Tooltip title="Code" placement='top'>
                <IconButton onClick={handleOpenFormular}>
                    <CodeIcon />
                </IconButton>
            </Tooltip>
            <Dialog open={openFormular} onClose={handleCloseFormular} scroll="paper">
                <StyledTitle>
                    <Typography variant="body1">FORMULA</Typography>
                </StyledTitle>
                <DialogContent>
                    <CodeBlock code={props.formula} language={languages.Javascript} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseFormular}>CLOSE</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Main;
