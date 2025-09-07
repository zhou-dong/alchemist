import { Fab, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import HomeIcon from '@mui/icons-material/Home';
import ForestIcon from '@mui/icons-material/Forest';

export const BackToMainFab = () => {

    const navigate = useNavigate();

    return (
        <Tooltip
            title="Back to Tree Main"
            placement="left"
        >
            <Fab
                color="primary"
                size="large"
                onClick={() => navigate("/pages/categories/tree")}
                sx={{
                    position: 'fixed',
                    bottom: 80,
                    left: 24,
                    color: 'white',
                    zIndex: 1000,
                }}
            >
                <ForestIcon />
            </Fab>
        </Tooltip>
    );
};
