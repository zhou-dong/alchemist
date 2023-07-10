import { useAlgoContext } from "./AlgoContext";
import { Button, ButtonGroup, Stack } from '@mui/material';
import { wait } from "../../../data-structures/_commons/utils";
import { State } from "./AlgoState";

const Main = () => {

    const { animate, cancelAnimate, state, setState, graph } = useAlgoContext();

    const handleRefresh = async () => {
        if (!graph) {
            return;
        }
        setState(State.Computing);
        graph.resetPositions();
        graph.show();
        animate();
        wait(0.2);
        cancelAnimate();
        setState(State.Playing);
    }

    return (
        <Stack
            spacing={2}
            direction="column"
            style={{
                display: "flex",
                position: "fixed",
                bottom: "150px",
                justifyContent: "center",
                width: "100%",
                alignItems: "center"
            }}
        >
            <div>
                <ButtonGroup>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleRefresh}
                        sx={{ color: "#FFF", zIndex: 1 }}
                        disabled={state !== State.Playing}
                        color="info"
                    >
                        next
                    </Button>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleRefresh}
                        sx={{ color: "#FFF", zIndex: 1 }}
                        disabled={state !== State.Playing}
                        color="info"
                    >
                        refresh
                    </Button>
                </ButtonGroup>
            </div>
        </Stack>
    );
}

export default Main;
