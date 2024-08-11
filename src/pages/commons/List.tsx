import { Link as RouterLink } from "react-router-dom";
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useGames } from "../../games/commons/GamesContext";

interface Props {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
}

interface AlgorithmProps extends Props {
    img: string;
    title: string;
    path: string;
}

const Algorithm = ({ title, path, img, xs, sm, md, lg, xl }: AlgorithmProps) => (
    <Grid
        item
        xs={xs}
        sm={sm}
        md={md}
        lg={lg}
        xl={xl}
    >
        <Card variant="outlined" sx={{ borderRadius: "15px", padding: 1, paddingBottom: 0 }}>
            <CardActionArea component={RouterLink} to={path}>
                <CardMedia
                    component="img"
                    image={img}
                >
                </CardMedia>
            </CardActionArea>
            <CardContent style={{ paddingBottom: 2, paddingTop: 5 }} sx={{ maxHeight: "64px" }}>
                <Typography variant="body2">
                    {title}
                </Typography>
            </CardContent>
        </Card>
    </Grid >
);

const Sorting = ({ xs, sm, md, lg, xl }: Props) => {

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
                        xs={xs}
                        sm={sm}
                        md={md}
                        lg={lg}
                        xl={xl}
                    />
                ))
            }
        </Grid>
    )
};

export default Sorting;
