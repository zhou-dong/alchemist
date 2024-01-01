import LooksOneOutlinedIcon from '@mui/icons-material/LooksOneOutlined';
import LooksTwoOutlinedIcon from '@mui/icons-material/LooksTwoOutlined';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

export type Solution = "one" | "two";

interface Props {
    solution: Solution;
    setSolution: React.Dispatch<React.SetStateAction<Solution>>;
}

const Main = ({ solution, setSolution }: Props) => {

    const handleOnClick = (
        event: React.MouseEvent<HTMLElement>,
        newValue: Solution | null
    ) => {
        if (newValue) {
            setSolution(newValue);
        }
    }

    return (
        <ToggleButtonGroup
            value={solution}
            exclusive
            onChange={handleOnClick}
            size='small'
        >
            <ToggleButton value="one" >
                <LooksOneOutlinedIcon />
            </ToggleButton>
            <ToggleButton value="two" >
                <LooksTwoOutlinedIcon />
            </ToggleButton>
        </ToggleButtonGroup>
    );
}

export default Main;
