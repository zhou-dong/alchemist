import { Link as RouterLink } from "react-router-dom";
import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import { useGames } from "../games/commons/GamesContext";

interface AlgorithmProps {
    img: string;
    title: string;
    path: string;
}

const Algorithm = ({ title, path, img }: AlgorithmProps) => (
    <Grid item xs={6} sm={4} md={3}>
        <Card>
            <CardActionArea component={RouterLink} to={path}>
                <CardMedia
                    component="img"
                    image={img}
                >
                </CardMedia>
            </CardActionArea>
            <CardContent>
                <Typography variant="subtitle1">
                    {title}
                </Typography>
            </CardContent>
        </Card>
    </Grid >
);

const Sorting = () => {

    const { games } = useGames();

    return (
        <Container maxWidth="xl">
            <Grid container spacing={4}>
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
        </Container>
    )
};

export default Sorting;
