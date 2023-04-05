import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, Grid, ToggleButton, Typography } from "@mui/material"
import { styled } from '@mui/material/styles';

import AppleIcon from '@mui/icons-material/Apple';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import GoogleIcon from '@mui/icons-material/Google';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useGames } from '../games/commons/GamesContext';
import Company from '../games/commons/segments/company';
import Difficulty from '../games/commons/segments/difficulty';
import Category from '../games/commons/segments/category';

const StyledRowHeader = styled(Grid)(() => ({
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap',
}));

const RowHeader: React.FC<{ icon: React.ReactNode, name: string }> = ({ icon, name }) => (
    <>
        {icon}
        <Typography sx={{ margin: 1 }}>
            {name}
        </Typography>
    </>
);

const TextItem: React.FC<{
    name: string,
    initSelected: boolean,
    onClick: (selected: boolean) => void
}> = ({ name, initSelected, onClick }) => {
    const [selected, setSelected] = React.useState<boolean>(initSelected);

    return (
        <ToggleButton
            value={name}
            selected={selected}
            sx={{ border: 0 }}
            onChange={() => setSelected(!selected)}
            onClick={() => onClick(!selected)}
        >
            {name}
        </ToggleButton>
    );
}

const ComponentItem: React.FC<{
    child: React.ReactNode,
    value: string,
    initSelected: boolean,
    onClick: (selected: boolean) => void
}> = ({ child, value, initSelected, onClick }) => {
    const [selected, setSelected] = React.useState<boolean>(initSelected);

    return (
        <ToggleButton
            value={value}
            selected={selected}
            sx={{ border: 0 }}
            onChange={() => setSelected(!selected)}
            onClick={() => onClick(!selected)}
        >
            {child}
        </ToggleButton>
    );
}

const calculateSelected = <T,>(arr: T[], item: T): boolean => {
    return arr.includes(item);
}

const updateSegments = <T,>(segments: T[], segment: T, selected: boolean): T[] => {
    const set = new Set(segments);
    selected ? set.add(segment) : set.delete(segment);
    return Array.from(set);
}

const Categories = () => {

    const { categories, setCategories } = useGames();

    return (
        <>
            <StyledRowHeader item md={2} sm={3} xs={12}>
                <RowHeader name="Category" icon={<CategoryOutlinedIcon />} />
            </StyledRowHeader>
            <Grid item md={10} sm={9} xs={12}>
                <TextItem
                    name="Stack"
                    initSelected={calculateSelected(categories, Category.Stack)}
                    onClick={(selected: boolean) => setCategories(items => updateSegments(items, Category.Stack, selected))}
                />
                <TextItem
                    name="Queue"
                    initSelected={calculateSelected(categories, Category.Queue)}
                    onClick={(selected: boolean) => setCategories(items => updateSegments(items, Category.Queue, selected))}
                />
                <TextItem
                    name="Sorting"
                    initSelected={calculateSelected(categories, Category.Sorting)}
                    onClick={(selected: boolean) => setCategories(items => updateSegments(items, Category.Sorting, selected))} />
                <TextItem
                    name="Tree"
                    initSelected={calculateSelected(categories, Category.Tree)}
                    onClick={(selected: boolean) => setCategories(items => updateSegments(items, Category.Tree, selected))}
                />
                <TextItem
                    name="Two Pointers"
                    initSelected={calculateSelected(categories, Category.TwoPointers)}
                    onClick={(selected: boolean) => setCategories(items => updateSegments(items, Category.TwoPointers, selected))}
                />
                <TextItem
                    name="Dynamic Programming"
                    initSelected={calculateSelected(categories, Category.DynamicProgramming)}
                    onClick={(selected: boolean) => setCategories(items => updateSegments(items, Category.DynamicProgramming, selected))}
                />
                <TextItem
                    name="Hash Table"
                    initSelected={calculateSelected(categories, Category.HashTable)}
                    onClick={(selected: boolean) => setCategories(items => updateSegments(items, Category.HashTable, selected))}
                />
                <TextItem
                    name="Heap"
                    initSelected={calculateSelected(categories, Category.Heap)}
                    onClick={(selected: boolean) => setCategories(items => updateSegments(items, Category.Heap, selected))}
                />
            </Grid>
        </>
    )
};

const Difficulties = () => {

    const { difficulties, setDifficulties } = useGames();

    return (
        <>
            <StyledRowHeader item md={2} sm={3} xs={12}>
                <RowHeader name="Difficulty" icon={<PsychologyOutlinedIcon />} />
            </StyledRowHeader>
            <Grid item md={10} sm={9} xs={12}>
                <TextItem
                    name="easy"
                    initSelected={calculateSelected(difficulties, Difficulty.Easy)}
                    onClick={(selected: boolean) => setDifficulties(items => updateSegments(items, Difficulty.Easy, selected))}
                />
                <TextItem
                    name="medium"
                    initSelected={calculateSelected(difficulties, Difficulty.Medium)}
                    onClick={(selected: boolean) => setDifficulties(items => updateSegments(items, Difficulty.Medium, selected))}
                />
                <TextItem
                    name="hard"
                    initSelected={calculateSelected(difficulties, Difficulty.Hard)}
                    onClick={(selected: boolean) => setDifficulties(items => updateSegments(items, Difficulty.Hard, selected))}
                />
            </Grid>
        </>
    )
};



const Companies = () => {

    const { companies, setCompanies } = useGames();
    return (
        <>
            <StyledRowHeader item md={2} sm={3} xs={12}>
                <RowHeader name="Company" icon={<BusinessOutlinedIcon />} />
            </StyledRowHeader>
            <Grid item md={10} sm={9} xs={12}>
                <ComponentItem
                    child={<GoogleIcon />}
                    value="google"
                    initSelected={calculateSelected(companies, Company.Google)}
                    onClick={(selected: boolean) => setCompanies(items => updateSegments(items, Company.Google, selected))}
                />
                <ComponentItem
                    child={<AppleIcon />}
                    value="apple"
                    initSelected={calculateSelected(companies, Company.Apple)}
                    onClick={(selected: boolean) => setCompanies(items => updateSegments(items, Company.Apple, selected))}
                />
                <ComponentItem
                    child={<FacebookRoundedIcon />}
                    value="facebook"
                    initSelected={calculateSelected(companies, Company.Facebook)}
                    onClick={(selected: boolean) => setCompanies(items => updateSegments(items, Company.Facebook, selected))}
                />
                <ComponentItem
                    child={<TwitterIcon />}
                    value="twitter"
                    initSelected={calculateSelected(companies, Company.Twitter)}
                    onClick={(selected: boolean) => setCompanies(items => updateSegments(items, Company.Twitter, selected))}
                />
            </Grid>
        </>
    )
};

interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Filters = ({ open, setOpen }: Props) => {

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            maxWidth="md"
            open={open}
            onClose={handleClose}
        >
            <DialogContent>
                <Grid container spacing={1}>
                    <Categories />
                    <Difficulties />
                    <Companies />
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
};

export default Filters;
