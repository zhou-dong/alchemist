import React from "react";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import InputIcon from '@mui/icons-material/Input';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CodeBlock, { languages } from '../../dp/_components/CodeBlock';
import { useAlgoContext } from "./AlgoContext";
import { formula3 } from "./contents";
import { State } from "./AlgoState";

const IsPalindromeDisplay: React.FC<{ isPalindrome: boolean }> = ({ isPalindrome }) => (
    <Paper variant="outlined" sx={{ padding: "10px 20px" }}>
        <Stack direction="row">
            <Typography>
                Is Palindrome:&nbsp;
            </Typography>
            <Typography color={isPalindrome ? "primary" : "error"}>
                {isPalindrome ? "True" : "False"}
            </Typography>
        </Stack>
    </Paper>
);

const InputDisplay: React.FC<{ index: number, value: number }> = ({ index, value }) => (
    <Stack
        spacing={2}
        direction="row"
        sx={{ alignItems: "center", justifyContent: "center" }}
    >
        <Typography>
            Input Number
        </Typography>

        <ToggleButtonGroup>
            {
                value.toString().split("").map((char, i) => (
                    <ToggleButton
                        key={i}
                        value={char}
                        sx={{ height: "45px", width: "45px", fontWeight: "500" }}
                        selected={i === value.toString().length - 1 - index}
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
            code={formula3}
            language={languages.Typescript}
            showLineNumbers={true}
            linesToHighlight={linesToHighlight}
            wrapLines={true}
        />
    </Paper>
);

const SubmitIcon: React.FC<{ success: boolean }> = ({ success }) => {
    return success ? <CheckOutlinedIcon fontSize='medium' /> : <InputIcon fontSize='medium' />;
}

const InputSubmit: React.FC<{
    name: string,
    tip: string,
    disabled: boolean,
    focused: boolean,
    success: boolean,
    handleOnClick: (value: number) => boolean
}> = ({ name, tip, disabled, focused, success, handleOnClick }) => {

    const id = "input-" + name;
    const [error, setError] = React.useState(false);
    const [value, setValue] = React.useState(-1);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(event.target.value));
    };

    const onClick = () => {
        const isSuccess = handleOnClick(value);
        setError(!isSuccess);
    };

    return (
        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <Paper variant="outlined">
                <CodeBlock code={tip} language={languages.Typescript} />
            </Paper>

            <FormControl variant='outlined' size='medium' sx={{ width: "150px" }} focused={focused}>
                <InputLabel htmlFor={id}>{name}</InputLabel>
                <OutlinedInput
                    label={name}
                    error={error}
                    id={id}
                    type='number'
                    onChange={handleOnChange}
                    disabled={disabled}
                    endAdornment={
                        <InputAdornment position='end'>
                            <IconButton color='primary' edge="end" onClick={onClick} disabled={disabled}>
                                <SubmitIcon success={success} />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
        </Stack >
    );
}

const Main = () => {

    const { index, value, setIndex, setState, result, state } = useAlgoContext();

    const [linesToHighlight, setLinesToHighlight] = React.useState<number[]>([9]);

    const [revertedDisabled, setRevertedDisabled] = React.useState(false);
    const [revertedFocused, setRevertedFocused] = React.useState<boolean>(true);
    const [revertedTip, setRevertedTip] = React.useState(`0 * 10 + ${value} % 10`);
    const [revertedSuccess, setRevertedSuccess] = React.useState(false);

    const [xDisabled, setXDisabled] = React.useState(true);
    const [xFocused, setXFocused] = React.useState<boolean>(false);
    const [xTip, setXTip] = React.useState(`Math.floor(${value} / 10)`);
    const [xSuccess, setXSuccess] = React.useState(false);

    React.useEffect(() => {

        setRevertedDisabled(false);
        setRevertedFocused(true);
        setRevertedTip(`0 * 10 + ${value} % 10`);
        setRevertedSuccess(false);

        setXDisabled(true);
        setXFocused(false);
        setXTip(`Math.floor(${value} / 10)`);
        setXSuccess(false);
    }, [value]);

    const handleInputRevertedClick = (value: number): boolean => {
        const item = result.items[index];
        if (!item) {
            return false;
        }
        // TODO
        // if (item.reverted !== value) {
        // return false;
        // }

        // disable input-reverted
        setRevertedDisabled(true);
        setRevertedFocused(false);
        setRevertedSuccess(true);

        // enable input x
        setXDisabled(false);
        setXFocused(true);
        setXSuccess(false);
        setLinesToHighlight([10]);
        return true;
    }

    const handleInputXClick = (value: number): boolean => {
        const item = result.items[index];
        if (!item) {
            return false;
        }
        if (item.x !== value) {
            return false;
        }

        if (index === result.items.length - 1) {
            setLinesToHighlight([13]);
            setState(State.Finished);
        } else {

            // enable input-reverted
            setRevertedDisabled(false);
            setRevertedFocused(true);
            setRevertedSuccess(false);
            setLinesToHighlight([9]);

            // TODO
            // update help expression
            // setRevertedTip(`${item.reverted} * 10 + ${item.x} % 10`);
            setXTip(`Math.floor(${item.x} / 10)`);
            setIndex(i => i + 1);
        }

        // disable input x
        setXDisabled(true);
        setXFocused(false);
        setXSuccess(true);
        return true;
    }

    return (
        <Stack sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", direction: "row" }} spacing={2}>
            <CodeDisplay linesToHighlight={linesToHighlight} />
            <InputDisplay index={index} value={value} />
            <InputSubmit
                name="reverted"
                disabled={revertedDisabled}
                handleOnClick={handleInputRevertedClick}
                focused={revertedFocused}
                tip={revertedTip}
                success={revertedSuccess}
            />
            <InputSubmit
                name="x"
                disabled={xDisabled}
                handleOnClick={handleInputXClick}
                focused={xFocused}
                tip={xTip}
                success={xSuccess}
            />
                 // TODO
            {/* {state === State.Finished && <IsPalindromeDisplay isPalindrome={result.isPalindrome} />} */}
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
