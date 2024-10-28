import { Stack, Typography } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import { title } from "../contents";

const TitleContent = () => (
    <Typography
        variant="h5"
        component="h1"
        sx={{
            fontWeight: 400,
            textAlign: "center",
        }}
        color="primary"
    >
        {title}
    </Typography>
);

const Start = () => (
    <StarIcon
        fontSize="large"
        sx={{
            color: "gold",
            animation: 'rotate 2.5s linear infinite',
            '@keyframes rotate': {
                '0%': {
                    transform: 'rotate(0deg)',
                },
                '100%': {
                    transform: 'rotate(360deg)',
                },
            },
        }}
    />
);

const Main = () => (
    <Stack
        direction="row"
        spacing={1}
        sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}
    >
        <Start />
        <TitleContent />
    </Stack>
);

export default Main;
