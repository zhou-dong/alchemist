import { IconProps, Typography } from "@mui/material"
import { styled } from '@mui/material/styles';
import { ReactElement } from "react";

const Center = styled("div")(() => ({
    border: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
}));

interface Props {
    text?: string;
    icon?: ReactElement<IconProps>;
}

const Display = ({ text, icon }: Props) => (
    <Center>
        <div style={{ marginTop: "-100px" }} >
            {icon}
        </div>
        <Typography
            align="center"
            variant="h1"
            sx={{ marginTop: "-100px" }}
            color="secondary"
        >
            {text}
        </Typography>
    </Center>
);

export default Display;
