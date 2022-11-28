import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { Alignment, useAlgoContext } from "./AlgoContext";

const Main = () => {

    const { alignment, setAlignment } = useAlgoContext();

    return (
        <ToggleButtonGroup
            value={alignment.toString()}
            color='primary'
            exclusive
        >
            <ToggleButton value={Alignment.Play.toString()} onClick={() => setAlignment(Alignment.Play)}>
                play
            </ToggleButton>
            <ToggleButton value={Alignment.Demo.toString()} onClick={() => setAlignment(Alignment.Play)}>
                demo
            </ToggleButton>
        </ToggleButtonGroup>
    )
}

export default Main;
