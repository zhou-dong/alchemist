import { Typography } from "@mui/material";
import { title } from "../contents";

const Main = () => (
    <div
        style={{
            position: "fixed",
            top: "6%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%"
        }}
    >
        <Typography
            variant="h5"
            sx={{ fontWeight: 240 }}
        >
            {title}
        </Typography>

    </div>
)

export default Main;
