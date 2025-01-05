import { Stack, Typography } from "@mui/material";
import { CheckCircleOutline } from '@mui/icons-material';
import { title } from "../contents";

const TitleContent = () => (
    <Typography
        variant="h5"
        component="h1"
        sx={{
            fontWeight: 300,
            textAlign: "center",
        }}
    >
        {title}
    </Typography>
);

interface Props {
    icon?: JSX.Element;
    success?: boolean;
}

const Main = ({ icon, success }: Props) => (
    <Stack
        direction="row"
        spacing={1}
        sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}
    >
        {icon && icon}
        <TitleContent />
        {success && <CheckCircleOutline sx={{ color: 'green' }} />}
    </Stack>
);

export default Main;
