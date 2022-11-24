import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";

const Main = () => {
    const { index, expression } = useAlgoContext();
    return (
        <ToggleButtonGroup size="large" color="primary">
            {
                Array.from(expression).map((value, i) =>
                    <ToggleButton value={value} key={i} selected={index === i} sx={{ height: "45px", width: "45px", fontWeight: "500" }}>
                        {value}
                    </ToggleButton>
                )
            }
        </ToggleButtonGroup>
    );
}

export default Main;
