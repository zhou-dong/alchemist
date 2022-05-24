import { PlayArrow } from "@mui/icons-material";
import { Avatar, Card, CardContent, CardHeader, Grid, IconButton, Typography } from "@mui/material";

let description = "Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in the wrong order."

interface AlgorithmProps {
    title: string;
    subHeader: string;
    description: string;
    path: string;
}

const Algorithm = ({ title, subHeader, description, path }: AlgorithmProps) => (
    <Grid item xs={6} md={4} lg={3}>
        <Card>
            <CardHeader
                avatar={<Avatar sx={{ bgcolor: "green" }}>{title.charAt(0)}</Avatar>}
                action={
                    <IconButton color="success" href={path}>
                        <PlayArrow />
                    </IconButton>
                }
                title={title}
                subheader={subHeader}
            />
            <CardContent>
                <Typography variant="body2">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    </Grid>
);

const Sorting = () => (
    <Grid container spacing={2} sx={{ padding: 2 }}>
        <Algorithm title="Bobble Sort" subHeader="Sorting" description={description} path="/sorting/bubble-sort" />
        <Algorithm title="Selection Sort" subHeader="Sorting" description={description} path="/sorting/selection-sort" />
        <Algorithm title="Merge Sort" subHeader="Sorting" description={description} path="/sorting/merge-sort" />
        <Algorithm title="Insertion Sort" subHeader="Sorting" description={description} path="/sorting/insertion-sort" />
        <Algorithm title="Quick Sort" subHeader="Sorting" description={description} path="sorting/quick-sort" />
        <Algorithm title="Heap Sort" subHeader="Sorting" description={description} path="sorting/heap-sort" />
        <Algorithm title="Counting Sort" subHeader="Sorting" description={description} path="sorting/counting-sort" />
        <Algorithm title="Bucket Sort" subHeader="Sorting" description={description} path="sorting/bucket-sort" />
        <Algorithm title="Radix Sort" subHeader="Sorting" description={description} path="sorting/radix-sort" />
    </Grid>
);

export default Sorting;
