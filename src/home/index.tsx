
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import Filters from "./Filters";
import MenuButton from './Menu';
import List from './List';

const PaginationContainer = styled("div")({
    // position: "fixed",
    // left: 0,
    // bottom: 0,
    width: "100%",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
});

const SimplePagination = () => (
    <div>
        <Pagination count={100} defaultPage={6} boundaryCount={2} />
    </div>
);

const Home = () => {
    const [open, setOpen] = React.useState<boolean>(false);

    return (
        <>
            <MenuButton open={open} setOpen={setOpen} />
            <Filters open={open} setOpen={setOpen} />
            <List />
            <PaginationContainer>
                <SimplePagination />
            </PaginationContainer>
        </>
    )
};

export default Home;
