import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { useAlgoContext } from './AlgoContext';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { State } from './AlgoState';

export default function Title() {

    const { state } = useAlgoContext();

    return (
        <Box sx={{
            position: "fixed",
            top: 40,
            flexGrow: 1,
            width: "100%",
            display: 'flex',
            alignItems: "center",
            justifyContent: "center",
        }}>
            <Typography variant='h5'>
                Basic Calculator
            </Typography>

            {state === State.Finished && <>&nbsp;<CheckCircleOutlineOutlinedIcon color='primary' /></>}
        </Box>
    );
}
