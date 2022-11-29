import * as React from 'react';
import InputIcon from '@mui/icons-material/Input';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { Centered } from "../../dp/_components/Centered";
import { title } from "./contents";
import { Badge, CardContent, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';
import HashTable from './HashTable';
import AlgoInstructions from './Instructions';
import LightTooltip from '../../../commons/LightTooltip';
import InputTable from './InputTable';
import { useAlgoContext } from './AlgoContext';

enum InputStatus {
    Filling, Finished
}

const SubmitIcon: React.FC<{ inputStatus: InputStatus, success: boolean }> = ({ inputStatus, success }) => {
    if (success || inputStatus === InputStatus.Finished) {
        return <CheckOutlinedIcon fontSize='small' />;
    } else {
        return <InputIcon fontSize='small' />;
    }
}

interface InputProps {
    inputStatus: InputStatus;
    name: string;
    handleOnClick: (value: number) => boolean;
    success: boolean;
    tip: string;
}

const InputSubmit = ({ inputStatus, name, handleOnClick, success, tip }: InputProps) => {

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

    const [openTooltip, setOpenTooltip] = React.useState(false);
    const disabled: boolean = success || inputStatus === InputStatus.Finished;

    return (
        <div>
            <LightTooltip title={tip} open={openTooltip} placement="right-start">
                <Badge
                    badgeContent={"?"}
                    color="info"
                    onMouseOver={() => setOpenTooltip(true)}
                    onMouseOut={() => setOpenTooltip(false)}
                >
                    <FormControl variant='outlined' size='small' sx={{ width: "150px" }}>
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
                                    <IconButton color='primary' edge="end" onClick={onClick} size="small" disabled={disabled}>
                                        <SubmitIcon inputStatus={inputStatus} success={success} />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Badge>
            </LightTooltip>
        </div>
    );
}

interface MapEntrySubmitProps {
    inputStatus: InputStatus;
    setInputStatus: React.Dispatch<React.SetStateAction<InputStatus>>;
    success: boolean;
}

const MapEntrySubmit = ({ inputStatus, setInputStatus, success }: MapEntrySubmitProps) => {

    const { index, compared, setMapIndex } = useAlgoContext();
    const mapKey = compared.chars[index];
    const mapValue = index;

    const [error, setError] = React.useState(false);
    const [value, setValue] = React.useState(-10);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(event.target.value));
    };

    const handleOnClick = () => {
        if (mapValue !== value) {
            setError(true);
        } else {
            setError(false);
            setMapIndex(i => i + 1);
            setInputStatus(InputStatus.Finished);
        }
    };

    const disabled: boolean = success || inputStatus === InputStatus.Finished;
    const [openTooltip, setOpenTooltip] = React.useState(false);

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
            <LightTooltip title="map.set(character, index)" open={openTooltip} placement="right-start">
                <Badge
                    badgeContent={"?"}
                    color="info"
                    onMouseOver={() => setOpenTooltip(true)}
                    onMouseOut={() => setOpenTooltip(false)}
                >
                    <TextField
                        size="small"
                        label="Map Value"
                        variant='outlined'
                        type="number"
                        onChange={handleOnChange}
                        disabled={disabled}
                        error={error}
                        sx={{ width: "150px" }}
                    />
                </Badge>
            </LightTooltip>

            <div>
                <IconButton sx={{ border: "1px solid gray" }} size="medium" onClick={handleOnClick} color='primary' disabled={disabled}>
                    <SubmitIcon inputStatus={inputStatus} success={success} />
                </IconButton>
            </div>
        </Stack>
    );
}

const Main = () => {

    const { index, setIndex, input, success, compared, setCompared, setSuccess } = useAlgoContext();

    const [leftStatus, setLeftStatus] = React.useState<InputStatus>(InputStatus.Filling);
    const [maxStatus, setMaxStatus] = React.useState<InputStatus>(InputStatus.Filling);
    const [mapStatus, setMapStatus] = React.useState<InputStatus>(InputStatus.Filling);

    React.useEffect(() => {
        if (leftStatus === InputStatus.Finished && maxStatus === InputStatus.Finished && mapStatus === InputStatus.Finished) {
            setIndex(i => i + 1);
            setLeftStatus(InputStatus.Filling);
            setMaxStatus(InputStatus.Filling);
            setMapStatus(InputStatus.Filling);
        }
    }, [leftStatus, maxStatus, mapStatus, setIndex]);

    React.useEffect(() => {
        if (index === input.length) {
            setSuccess(true);
        }
    }, [index, input, setSuccess]);

    const HTable = () => (
        <CardContent>
            <Typography variant="subtitle1" sx={{ color: "gray" }}>
                Hash Table
            </Typography>
            <HashTable />
        </CardContent>
    );

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
            <InputSubmit
                inputStatus={leftStatus}
                name="Left"
                handleOnClick={handleLeftOnClick}
                success={success}
                tip="left = Math.max(left, map.get(character) + 1)"
            />
            <InputSubmit
                inputStatus={maxStatus}
                name="Max"
                handleOnClick={handleMaxOnClick}
                success={success}
                tip="max = Math.max(max, index - left + 1)"
            />
            <MapEntrySubmit
                inputStatus={mapStatus}
                setInputStatus={setMapStatus}
                success={success}
            />
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
