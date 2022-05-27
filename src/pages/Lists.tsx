import { Link as RouterLink } from "react-router-dom";
import { FavoriteBorder, ThumbDownOffAlt, ThumbUpOffAlt } from "@mui/icons-material";
import { Card, CardActionArea, CardActions, CardMedia, Grid, IconButton, Typography } from "@mui/material";
import { useProblems } from "../problems/commons/ProblemsContext";

interface AlgorithmProps {
    title: string;
    path: string;
}

const Algorithm = ({ title, path }: AlgorithmProps) => (
    <Grid item xs={6} md={4} lg={2}>
        <Card>
            <CardActionArea component={RouterLink} to={path}>
                <CardMedia
                    component="img"
                    image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                >
                </CardMedia>
                <Typography gutterBottom variant="subtitle1" component="div">
                    {title}
                </Typography>
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
    </Grid>
);

const Sorting = () => {

    const { problems } = useProblems();

    return (
        <Grid container spacing={2} sx={{ padding: 2 }}>
            {
                problems.map((problem, index) => (
                    <Algorithm key={index} title={problem.name} path={problem.path} />
                ))
            }
        </Grid>
    )
};

export default Sorting;
