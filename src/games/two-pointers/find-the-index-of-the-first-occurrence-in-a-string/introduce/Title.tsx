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
            variant="h4"
            sx={{ fontWeight: 340 }}
        >
            {title}
        </Typography>

    </div>
)

export default Main;
