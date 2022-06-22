import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';

import CodeBlock, { languages } from './CodeBlock';

export interface Props {
    readonly title: string;
    readonly openFormular: boolean;
    readonly formular: string;
    readonly handleCloseFormular: () => any;
}

const StyledTitle = styled(DialogTitle)(({ theme }) => ({
    padding: theme.spacing(1),
    paddingBottom: 0,
}));

const InfoModal = (props: Props) => (
    <Dialog open={props.openFormular} onClose={props.handleCloseFormular} scroll="paper">
        <StyledTitle>
            <Typography variant="body1">FORMULA</Typography>
        </StyledTitle>
        <DialogContent>
            <CodeBlock code={props.formular} language={languages.Javascript} />
        </DialogContent>
        <DialogActions>
            <Button onClick={props.handleCloseFormular}>CLOSE</Button>
        </DialogActions>
    </Dialog>
);

export default InfoModal;

