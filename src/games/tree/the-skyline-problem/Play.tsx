import { useAlgoContext } from "./AlgoContext";
import { Button, ButtonGroup, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { wait } from "../../../data-structures/_commons/utils";
import { State } from "./AlgoState";
import MouseIcon from '@mui/icons-material/Mouse';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const DisplayBuildings = () => {

    return (
        <>
        </>
    );
}

const DisplaySkyline = () => {

    return (
        <>
        </>
    );
}

const PlayActions = () => {

    const { animate, cancelAnimate, state, setState, buildings } = useAlgoContext();

    const Sort = () => {

        return (
            <>
            </>
        );
    };


    return (
        <>

            <ButtonGroup>
                <Button>
                    sort
                </Button>
            </ButtonGroup>
        </>
    );
}

const Main = () => {

    const { animate, cancelAnimate, state, setState, } = useAlgoContext();

    const handleCount = () => {

    }

    const handleAddToHeap = async () => {
        setState(State.Computing);


        animate();

        try {

            await wait(0.5);
        } catch (error) {
            console.error(error);
        }

        setState(State.AddToHeap);
        cancelAnimate();
    }

    const DisplayInput = () => (
        <ButtonGroup>

        </ButtonGroup>
    );



    const DisplayMap = () => (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Num</TableCell>
                    <TableCell>Count</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>

            </TableBody>
        </Table>
    );

    const DisplayResult = () => (
        <ButtonGroup size="large" color="success">

        </ButtonGroup>
    );

    const Dashboard = () => (
        <Stack spacing={2} direction="column" alignItems="flex-start">
            <DisplayInput />
            <DisplayMap />
            <DisplayResult />
        </Stack >
    );

    return (
        <>
            <div style={{
                position: "fixed",
                top: "150px",
                left: "10%"
            }}>
                {state !== State.Typing && <Dashboard />}
            </div>

            <div style={{
                position: "fixed",
                bottom: "150px",
                left: "50%",
                transform: "translate(-50%)",
            }}
            >
                <ButtonGroup size='large' variant='outlined'>
                    <Button
                        color="success"
                        startIcon={<MouseIcon />}
                        onClick={handleCount}
                    // disabled={state !== State.Count || index + 1 === nums.length}
                    >
                        count
                    </Button>
                    <Button
                        color="success"
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={handleAddToHeap}
                    // disabled={state !== State.AddToHeap || mapIndex === frequents.length}
                    >
                        Add to Heap
                    </Button>
                </ButtonGroup>
            </div>
        </>
    );
}

export default Main;
