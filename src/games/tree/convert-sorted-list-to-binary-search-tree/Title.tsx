import { CheckCircleOutline } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { title } from "./contents";
import { useAlgoContext } from './AlgoContext';
import { State } from './AlgoState';

export default function Title() {

    const { state } = useAlgoContext();

    return (
        <Stack sx={{ alignItems: "center", justifyContent: "center" }} direction="row">
            <Typography variant='body1' display="inline">
                {title}
            </Typography>
            {state === State.Finished && <CheckCircleOutline sx={{ color: 'green' }} />}
        </Stack>
    );
}
