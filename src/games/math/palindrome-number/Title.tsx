import { Typography } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';
import { useAlgoContext } from './AlgoContext';
import { State } from './AlgoState';

const Main = () => {

    const { state } = useAlgoContext();

    return (
        <div style={{ marginTop: "60px", marginBottom: "20px" }} >
            <Typography
                variant='body1'
                display="flex"
                sx={{
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                Palindrome Number {state === State.Finished && <CheckCircleOutline sx={{ color: 'green' }} />}
            </Typography>
        </div>
    );
}

export default Main;
