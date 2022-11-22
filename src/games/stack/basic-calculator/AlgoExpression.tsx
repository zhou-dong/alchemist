import { Button, ButtonGroup } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";
import { styled } from '@mui/material/styles';

const AlgoExpression = styled(ButtonGroup)(() => ({
    position: 'fixed',
    top: 112,
    left: "50%",
    transform: "translateX(-50%)",
}));

const Main = () => {
    const { index, expression } = useAlgoContext();
    return (
        <AlgoExpression size="large" sx={{}}>
            {
                Array.from(expression).map((value, i) =>
                    <Button key={i} disabled={index !== i}>
                        {value}
                    </Button>
                )
            }
        </AlgoExpression>
    );
}

export default Main;
