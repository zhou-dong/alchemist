
import { styled } from '@mui/material/styles';

const Body = styled('main')(({ theme }) => ({
    border: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    flexGrow: 1,
    padding: theme.spacing(0),
}));

export default Body;
