import CheckIcon from '@mui/icons-material/Check';
import { useAlgoContext } from '../../AlgoContext';
import MouseIcon from '@mui/icons-material/Mouse';
import { State } from '../../AlgoState';
import { StyledButton } from '../Component';
import { Chip } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';

const Main = () => {

    const { state, setState, binarySearchSteps, index, setIndex } = useAlgoContext();

    const handleClick = () => {
        const step = binarySearchSteps[index];
        if (!step) {
            setState(State.Finished);
            return;
        }

        setIndex(i => i + 1);
    }

    return (
        <>
            <Chip
                icon={<ConstructionIcon />}
                label="Under ConstructionIcon"
                color='warning'
            />

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

