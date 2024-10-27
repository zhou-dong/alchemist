import { Stack, Typography } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import { title } from "../contents";

const Main = () => {

    return (
        <div
            style={{
                textAlign: "center",
                marginTop: "80px",
            }}
        >
            <Typography
                variant="h5"
                sx={{
                    fontWeight: 240,
                }}
            >
                {title}
            </Typography>

            <Stack
                direction="row"
                spacing={1}
                sx={{
                    marginTop: 2,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Typography
                    variant='h6'
                    display="inline"
                    color="primary"
                    sx={{
                        fontWeight: 300,
                    }}
                >
                    Welcome to the String Search Adventure!
                </Typography>
                <StarIcon
                    fontSize="large"
                    color="primary"
                    sx={{
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
            </Stack>
        </div>
    );
};

export default Main;
