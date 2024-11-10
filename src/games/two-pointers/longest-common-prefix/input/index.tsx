import { Stack } from "@mui/material";
import Title from "../description/Title";
import { useAlgoContext } from "../AlgoContext";
import { State } from "../AlgoState";




const Main = () => {
    const { setState } = useAlgoContext();

    const handleGoBack = () => {
        setState(State.Description);
    }

    return (
        <>
            input

            <Stack>

                <Title displayStar={true} />



            </Stack>
        </>
    );
}

export default Main;
