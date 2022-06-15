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
    readonly formulaOpen: boolean;
    readonly formula: string;
    readonly handleFormulaOnClose?: () => any;
    readonly handleCloseFormulaClick: () => any;
}

const StyledTitle = styled(DialogTitle)(({ theme }) => ({
    padding: theme.spacing(1),
    paddingBottom: 0,
}));

const InfoModal = (props: Props) => (
    <Dialog open={props.formulaOpen} onClose={props.handleFormulaOnClose} scroll="paper">
        <StyledTitle>
            <Typography variant="body1">FORMULA</Typography>
        </StyledTitle>
        <DialogContent sx={{ paddingTop: 0 }}>
            <CodeBlock code={props.formula} language={languages.Javascript} />
        </DialogContent>
        <DialogActions sx={{ paddingTop: 0 }}>
            <Button autoFocus onClick={props.handleCloseFormulaClick}>CLOSE</Button>
        </DialogActions>
    </Dialog>
);

export default InfoModal;

