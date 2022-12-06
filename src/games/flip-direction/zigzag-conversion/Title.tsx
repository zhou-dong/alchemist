import { Typography } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';
import { useAlgoContext } from './AlgoContext';
import { State } from './AlgoState';

const Main = () => {

    const { state } = useAlgoContext();

    return (
        <Typography
            variant='body1'
            display="flex"
            sx={{
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            Zigzag Conversion {state === State.Finished && <CheckCircleOutline sx={{ color: 'green' }} />}
        </Typography>
    );
}

export default Main;
