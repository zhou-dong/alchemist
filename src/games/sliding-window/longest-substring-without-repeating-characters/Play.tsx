import * as React from 'react';
import InputIcon from '@mui/icons-material/Input';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { Centered } from "../../dp/_components/Centered";
import { title } from "./contents";
import { CardContent, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';
import HashTable from './HashTable';
import AlgoInstructions from './Instructions';

import InputTable, { IndexProps, LeftProps, Range, RangeProps } from './InputTable';
import { useAlgoContext } from './AlgoContext';

interface Props {
    alignment: string;
    setAlignment: React.Dispatch<React.SetStateAction<string>>;
}

enum InputStatus {
    Filling, Finished
}

const InputSubmitIcon: React.FC<{ inputStatus: InputStatus }> = ({ inputStatus }) => {
    if (inputStatus === InputStatus.Filling) {
        return <InputIcon fontSize='small' />;
    } else {
        return <CheckOutlinedIcon fontSize='small' />;
    }
}

const InputSubmit: React.FC<{
    target: number,
    name: string,
    inputStatus: InputStatus,
    setInputStatus: React.Dispatch<React.SetStateAction<InputStatus>>
}> = ({ target, name, inputStatus, setInputStatus }) => {

    const [error, setError] = React.useState(false);
    const [value, setValue] = React.useState(-1);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(event.target.value));
    };

    const handleOnClick = () => {
        if (target !== value) {
            setError(true);
        } else {
            setError(false);
            setInputStatus(InputStatus.Finished);
        }
    };

    const id = "input-" + name;

    return (
        <div>
            <FormControl variant='outlined' size='small' sx={{ width: "150px" }}>
                <InputLabel htmlFor={id}>{name}</InputLabel>
                <OutlinedInput
                    label={name}
                    error={error}
                    id={id}
                    type='number'
                    onChange={handleOnChange}
                    disabled={inputStatus === InputStatus.Finished}
                    endAdornment={
                        <InputAdornment position='end'>
                            <IconButton color='primary' edge="end" onClick={handleOnClick} size="small">
                                <InputSubmitIcon inputStatus={inputStatus} />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
        </div>
    );
}

const MapEntrySubmit: React.FC<{
    mapKey: string,
    mapValue: number,
    inputStatus: InputStatus,
    setInputStatus: React.Dispatch<React.SetStateAction<InputStatus>>
}> = ({ mapKey, mapValue, inputStatus, setInputStatus }) => {

    const [error, setError] = React.useState(false);
    const [value, setValue] = React.useState(-1);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(event.target.value));
    };

    const handleOnClick = () => {
        if (mapValue !== value) {
            setError(true);
        } else {
            setError(false);
            setInputStatus(InputStatus.Finished);
        }
    };

    return (
        <Stack direction="row" spacing={2} sx={{ justifyContent: "center", alignItems: "center" }}>
            <TextField
                size='small'
                label="Map Key"
                variant='outlined'
                value={mapKey}
                disabled
                InputLabelProps={{
                    shrink: true,
                }}
                sx={{ width: "150px" }}
            />
            <TextField
                size="small"
                label="Map Value"
                variant='outlined'
                type="number"
                onChange={handleOnChange}
                disabled={inputStatus === InputStatus.Finished}
                error={error}
                sx={{ width: "150px" }}
            />
            <div>
                <IconButton sx={{ border: "1px solid gray" }} size="medium" onClick={handleOnClick} color='primary'>
                    <InputSubmitIcon inputStatus={inputStatus} />
                </IconButton>
            </div>
        </Stack>
    );
}

const Main = ({ alignment, setAlignment }: Props) => {

    const { index, setIndex, map, input, success, left, range, max, setInput, setRange, setMap, setLeft, setSuccess, setMax } = useAlgoContext();

    const [indexStatus, setIndexStatus] = React.useState<InputStatus>(InputStatus.Filling);
    const [leftStatus, setLeftStatus] = React.useState<InputStatus>(InputStatus.Filling);
    const [maxStatus, setMaxStatus] = React.useState<InputStatus>(InputStatus.Filling);
    const [mapStatus, setMapStatus] = React.useState<InputStatus>(InputStatus.Filling);

    React.useEffect(() => {
        if (indexStatus === InputStatus.Finished
            && leftStatus === InputStatus.Finished
            && maxStatus === InputStatus.Finished
        ) {
            setIndexStatus(InputStatus.Filling);
            setLeftStatus(InputStatus.Filling);
            setMaxStatus(InputStatus.Filling);


        }

    }, [indexStatus, leftStatus, maxStatus, setIndex])

    const HTable = () => {
        const key = (index.index > 0 && index.index < input.length) ? input.charAt(index.index) : ""
        return (
            <CardContent>
                <Typography variant="subtitle1" sx={{ color: "gray" }}>
                    Hash Table
                </Typography>
                <HashTable map={map} currentKey={key} input={input} />
            </CardContent>
        );
    }

    const HInput = () => (
        <CardContent>
            <Typography variant="subtitle1" sx={{ color: "gray" }}>
                Input
            </Typography>
            <InputTable input={input} index={index} range={range} left={left} />
        </CardContent>
    );

    const Title = () => (
        <Stack sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} direction="row">
            <Typography variant='body1'>
                {title}
            </Typography>
            {success && <CheckCircleOutline sx={{ color: 'green' }} />}
        </Stack>
    );

    const Actions = () => (
        <Stack spacing={2}>
            <InputSubmit name="Index" target={index.index} inputStatus={indexStatus} setInputStatus={setIndexStatus} />
            <InputSubmit name="Left" target={left.left} inputStatus={leftStatus} setInputStatus={setLeftStatus} />
            <InputSubmit name="Max" target={max} inputStatus={maxStatus} setInputStatus={setMaxStatus} />
            <MapEntrySubmit mapKey={"a"} mapValue={1} inputStatus={mapStatus} setInputStatus={setMapStatus} />
        </Stack>
    );

    return (
        <>
            <AlgoInstructions />
            <Centered>
                <div style={{ marginTop: "60px" }} />
                <Title />
                <div style={{ marginTop: "20px" }} />
                {input.length > 0 && <HTable />}
                {input.length > 0 && <HInput />}
                <div style={{ marginTop: "30px" }} />
                {input.length > 0 && <Actions />}
            </Centered>
        </>
    );
}

export default Main;
