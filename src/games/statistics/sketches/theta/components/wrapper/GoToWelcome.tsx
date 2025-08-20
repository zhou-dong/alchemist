import { Fab, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import * as Home from '@mui/icons-material/Home';
const HomeIcon = Home.default as unknown as React.ElementType;

export default function GoToWelcome() {
    const navigate = useNavigate();

    return (
        <Tooltip title="Go to Homepage">
            <Fab
                color="primary"
                sx={{
                    position: 'fixed',
                    top: 24,
                    right: 24,
                    zIndex: 1300,
                }}
                onClick={() => navigate('/algorithms/statistics/sketches/theta/steps/welcome')}
            >
                <HomeIcon sx={{ fontSize: 28 }} />
            </Fab>
        </Tooltip>
    );
}
