import CheckIcon from '@mui/icons-material/Check';
import { useAlgoContext } from '../../AlgoContext';
import MouseIcon from '@mui/icons-material/Mouse';
import { State } from '../../AlgoState';
import { StyledButton } from '../Component';

const Main = () => {

    const { state, setState, verticalScanningSteps, index, setIndex } = useAlgoContext();

    const handleClick = () => {
        setIndex(i => i + 1);
    }

    return (
        <>
            <StyledButton
                disabled={state !== State.Playing}
                onClick={handleClick}
                size='large'
                color='primary'
            >
                {state === State.Finished ? <CheckIcon sx={{ color: 'green' }} /> : <MouseIcon />}
            </StyledButton>
        </>
    );
}

export default Main;
