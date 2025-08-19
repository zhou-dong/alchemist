import { Fab, Tooltip } from "@mui/material"
import * as ArrowForward from '@mui/icons-material/ArrowForward';
import { useNavigate } from "react-router-dom";

const ArrowForwardIcon = ArrowForward.default as unknown as React.ElementType;

const NextPageButton = ({ nextPagePath, title }: { nextPagePath: string, title: string }) => {
    const navigate = useNavigate();
    return (
        <Tooltip title={title} placement="left">
            <Fab
                color='secondary'
                sx={{
                    position: 'fixed',
                    top: '50%',
                    right: 24,
                    transform: 'translateY(-50%)',
                    zIndex: 1300,
                }}
                onClick={() => {
                    navigate(nextPagePath);
                }}
            >
                <ArrowForwardIcon />
            </Fab>
        </Tooltip>
    )
};

export default NextPageButton;
