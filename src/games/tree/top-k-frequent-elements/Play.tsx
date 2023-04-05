import { useAlgoContext } from "./AlgoContext";
import { Button, ButtonGroup, Stack, Table, TableBody, TableCell, TableHead, TableRow, ToggleButton, Typography } from '@mui/material';
import { wait } from "../../../data-structures/_commons/utils";
import { State } from "./AlgoState";
import SortIcon from '@mui/icons-material/Sort';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import MouseIcon from '@mui/icons-material/Mouse';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Main = () => {

    const { animate, cancelAnimate, state, setState, heap, k, setK, setTopElements, topElements, map, setMap, nums, index, setIndex } = useAlgoContext();

    const handleCount = async () => {
        const num = nums[index + 1];
        if (num === undefined || !map) {
            return;
        }

        const count = map.get(num) || 0;
        map.set(num, count + 1);

        setIndex(index + 1);
    }

    const handleDelete = async () => {
        if (!heap) return;

        setState(State.Computing);
        animate();

        try {
            const root = await heap.delete();
            // setResult(root);
            setK(k => k - 1);
            await wait(0.5);
        } catch (error) {
            console.error(error);
        }

        setState(State.Playing);
        cancelAnimate();
    }

    const DisplayInput = () => (
        <ButtonGroup>
            {nums.map((num, i) =>
                <Button
                    key={i}
                    color="success"
                    sx={{ borderColor: "lightgray" }}
                    size="large"
                    variant={(i === index) ? "contained" : "outlined"}
                >
                    {num}
                </Button>
            )}
        </ButtonGroup>
    );

    const DisplayMap = () => (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        Num
                    </TableCell>
                    <TableCell>
                        Count
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    map && Array.from(map).map(([key, value]) => (
                        <TableRow key={key}>
                            <TableCell>
                                {key}
                            </TableCell>
                            <TableCell>
                                {value}
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );

    const Dashboard = () => (
        <Stack spacing={2} direction="column">
            <DisplayInput />
            <DisplayMap />
        </Stack>
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
                <ButtonGroup size='large' variant='contained'>
                    <Button
                        color="success"
                        startIcon={<MouseIcon />}
                        onClick={handleCount}
                        disabled={state !== State.Computing || index + 1 === nums.length}
                    >
                        count
                    </Button>
                    <Button
                        color="success"
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={handleDelete}
                        disabled={state !== State.Playing || k <= 0}
                    >
                        delete
                    </Button>
                </ButtonGroup>
            </div>
        </>
    );
}

export default Main;
