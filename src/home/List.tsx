import { Link as RouterLink } from "react-router-dom";
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useGames } from "../games/commons/GamesContext";

interface AlgorithmProps {
    img: string;
    title: string;
    path: string;
}

const Algorithm = ({ title, path, img }: AlgorithmProps) => (
    <Grid item xs={6} sm={4} md={3} lg={2} xl={1.5}>
        <Card variant="outlined" sx={{ borderRadius: "15px", padding: 1, paddingBottom: 0 }}>
            <CardActionArea component={RouterLink} to={path}>
                <CardMedia
                    component="img"
                    image={img}
                >
                </CardMedia>
            </CardActionArea>
            <CardContent style={{ paddingBottom: 2, paddingTop: 5 }} sx={{ maxHeight: "64px" }}>
                <Typography variant="body1">
                    {title}
                </Typography>
            </CardContent>
        </Card>
    </Grid >
);

const Sorting = () => {

    const { games } = useGames();

    return (
        <Grid container spacing={1.5}>
            {
                games.map((game, index) => (
                    <Algorithm
                        key={index}
                        title={game.name}
                        path={game.path}
                        img={game.img}
                    />
                ))
            }
        </Grid>
    )
};

export default Sorting;
