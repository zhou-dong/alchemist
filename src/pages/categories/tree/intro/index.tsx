import { Grid, Typography } from "@mui/material";

const Tree = () => {


    return (
        <>
            tree
        </>
    )
}

const Main = () => (
    <Grid container sx={{
        flex: 1,
    }}>
        <Grid
            item
            xs={12}
            md={5}
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "left",
                flexDirection: "column",
                padding: 10,
            }}
        >
            <Typography variant="h5">
                A tree is a non-linear data structure used in computer science.
            </Typography>

            <Typography variant="h6">
                It consists of nodes connected by edges.
            </Typography>

            <Typography variant="subtitle1">
                Trees are commonly used for hierarchical data representation, such as file systems, organizational charts, and more.
            </Typography>
        </Grid>
        <Grid
            item
            xs={12}
            md={7}
            sx={{ backgroundColor: "orange" }}
        >
            <Tree />
        </Grid>
    </Grid>
);


export default Main;