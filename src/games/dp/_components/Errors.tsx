import { Chip } from '@mui/material';
import ErrorIcon from '@mui/icons-material/ErrorOutline';

interface Props {
    errors: number;
}

const Errors = ({ errors }: Props) => (
    <Chip
        sx={{ border: "none" }}
        variant="outlined"
        icon={<ErrorIcon />}
        label={`ERRORS: ${errors}`}
    />
);

export default Errors;
