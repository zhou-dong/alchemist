import { IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import * as HomeIcon from '@mui/icons-material/Home';

const HomeIconFixed = HomeIcon.default as unknown as React.ElementType;

export default function GoToWelcome() {
    const navigate = useNavigate();

    return (
        <Tooltip title="Go to Homepage">
            <IconButton
                color="primary"
                sx={{
                    position: 'fixed',
                    top: 24,
                    right: 24,
                    zIndex: 1300,
                    borderRadius: '50%',
                    padding: 1.5,
                    bgcolor: 'primary.main',             // background color (contained style)
                    color: 'primary.contrastText',       // icon color
                    boxShadow: 3,                        // elevation like contained
                    '&:hover': {
                        bgcolor: 'primary.dark',           // hover effect
                        boxShadow: 5,
                    },
                }}
                onClick={() => navigate('/sketches/theta/welcome')}
            >
                <HomeIconFixed sx={{ fontSize: 28 }} />
            </IconButton>
        </Tooltip>
    );
}
