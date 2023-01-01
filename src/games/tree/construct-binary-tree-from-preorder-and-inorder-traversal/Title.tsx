import Box from '@mui/material/Box';
import { CheckCircleOutline } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { title } from "./contents";
import { useAlgoContext } from './AlgoContext';
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
            <Typography variant='body1'>
                {title}
            </Typography>
            <Typography variant='body1'>
                {state === State.Finished && <CheckCircleOutline sx={{ color: 'green' }} />}
            </Typography>
        </Box>
    );
}
