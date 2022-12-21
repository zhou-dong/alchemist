import { Typography } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';
import { useAlgoContext } from './AlgoContext';
import { State } from './AlgoState';
import { title } from "./contents";

const Main = () => {

    const { state } = useAlgoContext();

    return (
        <Typography
            display="flex"
            variant='h5'
            sx={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: "60px",
                marginBottom: "20px"
            }}
        >
            {title} {state === State.Finished && <CheckCircleOutline sx={{ color: 'green' }} />}
        </Typography>
    );
}

export default Main;
