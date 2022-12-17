import { Typography } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';
import { useAlgoContext } from './AlgoContext';
import { State } from './AlgoState';
import { title } from "./contents";

const Main = () => {

    const { state } = useAlgoContext();

    return (
        <Typography
            variant='h5'
            display="flex"
            sx={{
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            {title} {state === State.Finished && <CheckCircleOutline sx={{ color: 'green' }} />}
        </Typography>
    );
}

export default Main;
