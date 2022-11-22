import { ToggleButton, ToggleButtonGroup } from "@mui/material";
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
            <ToggleButtonGroup
                exclusive
                size="large"
                color="primary"
            >
                {
                    Array.from(expression).map((value, i) =>
                        <ToggleButton value={value} key={i} selected={index === i} sx={{ height: "45px", width: "45px", fontWeight: "500" }}>
                            {value}
                        </ToggleButton>
                    )
                }
            </ToggleButtonGroup>
        </div>
    );
}

export default Main;
