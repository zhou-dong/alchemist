import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Container, Divider, IconButton, Paper, Stack, Toolbar, Typography } from "@mui/material";
import Draggable from 'react-draggable';
import CodeBlock, { languages } from '../../_components/CodeBlock';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { formula } from '../contents';

interface Props {
    setDisplayFormula: React.Dispatch<React.SetStateAction<boolean>>
}

const Head = ({ setDisplayFormula }: Props) => (
    <Toolbar variant='dense' sx={{ display: "flex" }}>
        <IconButton color='primary'>
            <DragIndicatorIcon fontSize='medium' />
        </IconButton>

        <Stack sx={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }} spacing={0} direction="row">
            <IconButton>
                <EmojiObjectsOutlinedIcon />
            </IconButton>
            <Typography>Typescript</Typography>
        </Stack>

        <IconButton onClick={() => setDisplayFormula(false)}>
            <CloseIcon fontSize='medium' color='warning' />
        </IconButton>
    </Toolbar>
);

const Body = () => (
    <div style={{ padding: "0 30px" }}>
        <CodeBlock
            code={formula}
            language={languages.Typescript}
            showLineNumbers={false}
            linesToHighlight={[]}
            wrapLines={true}
        />
    </div>
);

const Main = ({ setDisplayFormula }: Props) => (
    <Container maxWidth="sm">
        <Draggable>
            <Paper elevation={4} >
                <Stack spacing={0}>
                    <Head setDisplayFormula={setDisplayFormula} />
                    <Divider variant='middle' />
                    <Body />
                </Stack>
            </Paper>
        </Draggable>
    </Container >
);

export default Main;
