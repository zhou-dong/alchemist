import { Typography } from "@mui/material";
import { title } from "../contents";

const Main = () => (
    <Typography
        variant="h5"
        component="h1"
        sx={{
            fontWeight: 240,
            textAlign: "center"
        }}
    >
        {title}
    </Typography>
);

export default Main;
