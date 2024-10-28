import { Stack, Typography } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import { title } from "../contents";

const Main = () => (
    <div
        style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}
    >
        <Stack
            direction="row"
            spacing={1}
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px 20px",
                borderRadius: "40px"
            }}
        >
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
        </Stack>
    </div>
);

export default Main;
