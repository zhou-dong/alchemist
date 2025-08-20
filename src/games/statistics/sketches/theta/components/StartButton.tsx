import { Button } from "@mui/material";
import * as RocketLaunch from '@mui/icons-material/RocketLaunch';

const RocketLaunchIcon = RocketLaunch.default as unknown as React.ElementType;

const StartButton = ({ onStart }: { onStart: () => void }) => (
    <Button
        variant='contained'
        size="large"
        sx={{
            position: 'fixed',
            bottom: 100,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1300,
        }}
        startIcon={<RocketLaunchIcon />}
        onClick={onStart}
    >
        Start
    </Button>
);

export default StartButton;
