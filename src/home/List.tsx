import { Link as RouterLink } from "react-router-dom";
import { FavoriteBorder, ThumbDownOffAlt, ThumbUpOffAlt } from "@mui/icons-material";
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, IconButton, Typography } from "@mui/material";
import { useGames } from "../games/commons/GamesContext";

interface AlgorithmProps {
    img: string;
    title: string;
    path: string;
}

const Algorithm = ({ title, path, img }: AlgorithmProps) => (
    <Grid item xs={6} sm={4} md={3}>
        <Card>
            <CardContent>
                <Typography variant="subtitle1">
                    {title}
                </Typography>
            </CardContent>
            <CardActionArea component={RouterLink} to={path}>
                <CardMedia
                    component="img"
                    image={img}
                >
                </CardMedia>
            </CardActionArea>
            <CardActions disableSpacing>
                <IconButton>
                    <ThumbUpOffAlt />
                </IconButton>
                <IconButton>
                    <ThumbDownOffAlt />
                </IconButton>
                <IconButton>
                    <FavoriteBorder />
                </IconButton>
            </CardActions>
        </Card>
    </Grid >
);

const Sorting = () => {

    const { games } = useGames();

    return (
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
    )
};

export default Sorting;
