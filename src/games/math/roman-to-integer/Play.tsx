import React from "react";
import { Button, Chip, Paper, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";

import CodeBlock, { languages } from '../../dp/_components/CodeBlock';
import { useAlgoContext } from "./AlgoContext";
import { formula } from "./contents";
import { State } from "./AlgoState";
import { Item } from "./algo";

const InputDisplay: React.FC<{ index: number, value: string }> = ({ index, value }) => (
    <Stack direction="column" spacing={1} sx={{ alignItems: "center" }}>
        <Chip label="Input Roman" variant="outlined" />

        <ToggleButtonGroup>
            {
                value.split("").map((char, i) => (
                    <ToggleButton
                        key={i}
                        value={char}
                        sx={{ height: "45px", width: "45px", fontWeight: "500" }}
                        selected={i === index}
                        color="primary"
                    >
                        {char}
                    </ToggleButton>
                ))
            }
        </ToggleButtonGroup>
    </Stack>
);

const CodeDisplay: React.FC<{ linesToHighlight: number[] }> = ({ linesToHighlight }) => (
    <Paper>
        <CodeBlock
            code={formula}
            language={languages.Typescript}
            showLineNumbers={true}
            linesToHighlight={linesToHighlight}
            wrapLines={true}
        />
    </Paper>
);

const ActionButton: React.FC<{
    name: string,
    startIcon: React.ReactNode,
    onClick: (item: Item) => boolean,
}> = ({ name, startIcon, onClick }) => {

    type ColorType = "primary" | "error"

    const { index, result } = useAlgoContext();
    const [color, setColor] = React.useState<ColorType>("primary");

    const handleOnClick = () => {
        const item = result[index];
        if (!item) {
            return;
        }
        const clickedResult = onClick(item);
        if (clickedResult) {
            setColor("primary");
        } else {
            setColor("error");
            setTimeout(() => {
                setColor("primary");
            }, 2000);
        }
    }

    return (
        <Button startIcon={startIcon} onClick={handleOnClick} sx={{ color: "#FFF" }} color={color}>
            <Typography sx={{ flex: 1 }}>
                {name}
            </Typography>
        </Button>
    );
}

const Main = () => {

    const { index, input, setIndex, setState, result, state } = useAlgoContext();

    return (
        <Stack spacing={2}>
            <div style={{ marginTop: "40px" }} />

            <InputDisplay index={index} value={input} />
            <div style={{ marginBottom: "10px" }} />

        </Stack>
    )
}

const Play = () => {
    const { state } = useAlgoContext();

    return (
        <>
            {state !== State.Typing && <Main />}
        </>
    );
}

export default Play;
