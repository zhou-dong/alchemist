import { CheckCircleOutline } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import { title } from "./contents";
import { useAlgoContext } from './AlgoContext';

const TitlePosition = styled('div')({
    position: "fixed",
    top: 40,
    width: "100%",
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
});

export default function Title() {

    const { steps, stepIndex } = useAlgoContext();
    const isSuccess: boolean = stepIndex > 0 && steps[stepIndex] === undefined;

    return (
        <TitlePosition>
            <Typography variant='body1'>
                {title}
            </Typography>
            {isSuccess && <CheckCircleOutline sx={{ color: 'green' }} />}
        </TitlePosition>
    );
}
