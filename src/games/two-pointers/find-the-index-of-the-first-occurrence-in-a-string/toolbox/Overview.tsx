import Container from "@mui/material/Container";
import { useAlgoContext } from "../AlgoContext";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Draggable from 'react-draggable';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import CloseIcon from '@mui/icons-material/Close';
import { contents, DisplayContents } from '../description/Contents';
import { styled } from "@mui/material";

const Location = styled(Container)(({ theme }) => (({
    position: "fixed",
    top: '50%',
    left: "50%",
    transform: "translate(-50%,-50%)",
    zIndex: 1,
})));

const Header = () => {
    const { setDisplayOverview } = useAlgoContext();

    return (
        <Toolbar variant='dense' sx={{ display: "flex" }}>
            <IconButton color='info'>
                <DragIndicatorIcon fontSize='medium' />
            </IconButton>
            <div style={{ flexGrow: 1 }} />
            <IconButton onClick={() => setDisplayOverview(false)}>
                <CloseIcon fontSize='medium' color='warning' />
            </IconButton>
        </Toolbar>
    );
};

const Main = () => (
    <Location maxWidth="lg">
        <Draggable>
            <Paper
                elevation={4}
                style={{
                    padding: "15px",
                    borderRadius: '15px',
                }}
            >
                <Header />
                <Divider variant='middle' />
                <DisplayContents contentIndex={contents.length - 1} contents={contents} />
            </Paper>
        </Draggable>
    </Location>
);

export default Main;
