import { Typography } from "@mui/material"
import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';

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

const Home = () => (
    <Center>
        <div style={{ marginTop: "-100px" }} >
            < HomeIcon sx={{ fontSize: 100 }} color="secondary" />
        </div>
        <Typography
            align="center"
            variant="h1"
            sx={{ marginTop: "-100px" }}
            color="secondary"
        >
            Alchemist
        </Typography>
    </Center>
);

export default Home;
