import * as React from 'react';
import InputIcon from '@mui/icons-material/Input';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { Centered } from "../../dp/_components/Centered";
import { title } from "./contents";
import { CardContent, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';
import HashTable from './HashTable';
import AlgoInstructions from './Instructions';

import InputTable from './InputTable';
import { useAlgoContext } from './AlgoContext';

enum InputStatus {
    Filling, Finished
}

const SubmitIcon: React.FC<{ inputStatus: InputStatus }> = ({ inputStatus }) => {
    if (inputStatus === InputStatus.Filling) {
        return <InputIcon fontSize='small' />;
    } else {
        return <CheckOutlinedIcon fontSize='small' />;
    }
}

interface InputProps {
    inputStatus: InputStatus;
    name: string;
    handleOnClick: (value: number) => boolean;
}

const InputSubmit = ({ inputStatus, name, handleOnClick }: InputProps) => {

    const id = "input-" + name;
    const [error, setError] = React.useState(false);
    const [value, setValue] = React.useState(-1);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(event.target.value));
    };

    const onClick = () => {
        const success = handleOnClick(value);
        if (success) {
            setError(false);
        } else {
            setError(true);
        }
    };

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
                            <IconButton color='primary' edge="end" onClick={onClick} size="small">
                                <SubmitIcon inputStatus={inputStatus} />
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
                    <SubmitIcon inputStatus={inputStatus} />
                </IconButton>
            </div>
        </Stack>
    );
}

const Main = () => {

    const { index, setIndex, input, success, compared, setCompared } = useAlgoContext();

    const [leftStatus, setLeftStatus] = React.useState<InputStatus>(InputStatus.Filling);
    const [maxStatus, setMaxStatus] = React.useState<InputStatus>(InputStatus.Filling);
    const [mapStatus, setMapStatus] = React.useState<InputStatus>(InputStatus.Filling);

    React.useEffect(() => {
        if (leftStatus === InputStatus.Finished
            && maxStatus === InputStatus.Finished
        ) {

            setIndex(i => i + 1);

            setLeftStatus(InputStatus.Filling);
            setMaxStatus(InputStatus.Filling);


        }

    }, [leftStatus, maxStatus, setIndex])

    const HTable = () => {
        const key = (index > 0 && index < input.length) ? input.charAt(index) : ""
        return (
            <CardContent>
                <Typography variant="subtitle1" sx={{ color: "gray" }}>
                    Hash Table
                </Typography>
                <HashTable map={new Map()} currentKey={key} input={input} />
            </CardContent>
        );
    }

    const HInput = () => (
        <CardContent>
            <Typography variant="subtitle1" sx={{ color: "gray" }}>
                Input
            </Typography>
            <InputTable />
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

    const handleLeftOnClick = (value: number): boolean => {
        if (compared.lefts[index].value === value) {
            setLeftStatus(InputStatus.Finished);
            compared.lefts[index].show = true;
            setCompared(compared);
            return true;
        } else {
            return false;
        }
    };

    const handleMaxOnClick = (value: number): boolean => {
        if (compared.maxs[index].value === value) {
            setMaxStatus(InputStatus.Finished);
            compared.maxs[index].show = true;
            setCompared(compared);
            return true;
        } else {
            return false;
        }
    };

    const Actions = () => (
        <Stack spacing={2}>
            <InputSubmit inputStatus={leftStatus} name="Left" handleOnClick={handleLeftOnClick} />
            <InputSubmit inputStatus={maxStatus} name="Max" handleOnClick={handleMaxOnClick} />
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
