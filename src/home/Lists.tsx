import { Link as RouterLink } from "react-router-dom";
import { FavoriteBorder, ThumbDownOffAlt, ThumbUpOffAlt } from "@mui/icons-material";
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, IconButton, Typography } from "@mui/material";
import { useGames } from "../games/commons/GamesContext";

interface AlgorithmProps {
    title: string;
    path: string;
}

const Algorithm = ({ title, path }: AlgorithmProps) => (
    <Grid item xs={6} sm={4} md={3} lg={2}>
        <Card>
            <CardActionArea component={RouterLink} to={path}>
                <CardContent>
                    <Typography variant="subtitle1">
                        {title}
                    </Typography>
                </CardContent>
                <CardMedia
                    component="img"
                    image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
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
        <Grid container spacing={2} sx={{ padding: 2 }}>
            {
                games.map((game, index) => (
                    <Algorithm
                        key={index}
                        title={game.name}
                        path={game.path}
                    />
                ))
            }
        </Grid>
    )
};

export default Sorting;
