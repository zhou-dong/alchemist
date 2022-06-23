import { Chip } from '@mui/material';
import StepsIcon from '@mui/icons-material/PollOutlined';

interface Props {
    steps: number;
}

const Steps = ({ steps }: Props) => (
    <Chip
        sx={{ border: "none" }}
        variant="outlined"
        icon={<StepsIcon />}
        label={`Steps: ${steps}`}
    />
);

export default Steps;
