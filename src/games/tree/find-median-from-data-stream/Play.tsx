import { useAlgoContext } from "./AlgoContext";
import { Button, InputAdornment, Stack, TextField } from '@mui/material';
import { wait } from "../../../data-structures/_commons/utils";
import { State } from "./AlgoState";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';

const Main = () => {

    const { smaller, greater, animate, cancelAnimate, state, setState } = useAlgoContext();

    const handleAddNum = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!smaller || !greater) {
            return;
        }
        setState(State.Inserting);
        const num = +(e.currentTarget.value);

        animate();

        try {
            const smallerTop = await smaller.peek();
            if (smallerTop === undefined || num < smallerTop) {
                await smaller.insert(num);
                if ((await smaller.size()) > (await greater.size() + 1)) {
                    await greater.insert((await smaller.delete())!);
                }
            } else {
                await greater.insert(num);
                if ((await greater.size()) > (await smaller.size())) {
                    await smaller.insert((await greater.delete())!);
                }
            }
        } catch (error) {
            console.error(error);
        }

        await wait(0.1);
        cancelAnimate();
        setState(State.Ready);
    }

    return (
        <>
            <div style={{
                position: "fixed",
                top: "150px",
                left: "10%"
            }}>

            </div>

            <div style={{
                position: "fixed",
                bottom: "150px",
                left: "50%",
                transform: "translate(-50%)",
            }}
            >
                <Stack direction="row" spacing={2}>
                    <TextField
                        color="success"
                        label="ADD NUM"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AddCircleOutlineIcon color="success" />
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                        type="number"
                        sx={{ width: "100px" }}
                        focused
                        onChange={handleAddNum}
                        disabled={state !== State.Ready}
                    />
                    <Button
                        color="success"
                        startIcon={<SearchIcon />}
                        // onClick={}
                        variant='outlined'
                        disabled={state !== State.Ready}
                    >
                        Find Median
                    </Button>
                    <Button
                        color="success"
                        startIcon={<RefreshIcon />}
                        // onClick={}
                        variant='outlined'
                        disabled={state !== State.Ready}
                    >
                        Clear
                    </Button>
                </Stack>
            </div>
        </>
    );
}

export default Main;
