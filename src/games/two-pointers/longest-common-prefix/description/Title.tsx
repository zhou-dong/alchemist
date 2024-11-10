import { Stack, Typography } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';

export const title = 'Longest Common Prefix';

const TitleContent = () => (
    <Typography
        variant="h5"
        component="h1"
        sx={{
            fontWeight: 400,
            textAlign: "center",
        }}
    >
        {title}
    </Typography>
);

const Star = () => (
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


interface Props {
    displayStar: boolean;
}

const Main = ({ displayStar }: Props) => (
    <Stack
        direction="row"
        spacing={1}
        sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}
    >
        {displayStar && <Star />}
        <TitleContent />
    </Stack>
);

export default Main;
