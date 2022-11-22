import { Button, ButtonGroup } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";
import CodeBlock, { languages } from '../../dp/_components/CodeBlock';
const Main = () => {
    const { index, expression } = useAlgoContext();
    return (
        <div style={{
            position: 'fixed',
            top: 112,
            left: "50%",
            transform: "translateX(-50%)",
        }}>
            <CodeBlock
                code={expression}
                language={languages.Javascript}
            />
            <ButtonGroup size="large">
                {
                    Array.from(expression).map((value, i) =>
                        <Button key={i} disabled={index !== i}>
                            {value}
                        </Button>
                    )
                }
            </ButtonGroup>
        </div>
    );
}

export default Main;
