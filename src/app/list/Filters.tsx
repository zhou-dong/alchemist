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
import { useProblems } from '../../algorithms/commons/ProblemsContext';

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

const TextItem: React.FC<{ name: string, value: string }> = ({ name, value }) => {
    const [selected, setSelected] = React.useState<boolean>(false);

    return (
        <ToggleButton
            value={value}
            selected={selected}
            sx={{ border: 0 }}
            onChange={() => {
                setSelected(!selected);
            }}
        >
            {name}
        </ToggleButton>
    );
}

const ComponentItem: React.FC<{
    child: React.ReactNode,
    value: string,
    segment: number,
    setSegments: React.Dispatch<React.SetStateAction<number[]>>,
}> = ({ child, value, segment, setSegments }) => {
    const [selected, setSelected] = React.useState<boolean>(false);

    return (
        <ToggleButton
            value={value}
            selected={selected}
            sx={{ border: 0 }}
            onChange={() => {
                setSelected(!selected);
            }}
            onClick={() => {
                setSegments(segments => {
                    const set = new Set(segments);
                    if (!selected) {
                        set.add(segment)
                    } else {
                        set.delete(segment);
                    }
                    return Array.from(set);
                })
            }}
        >
            {child}
        </ToggleButton>
    );
}

const Category = () => (
    <>
        <StyledRowHeader item md={2} sm={3} xs={12}>
            <RowHeader name="Category" icon={<CategoryOutlinedIcon />} />
        </StyledRowHeader>
        <Grid item md={10} sm={9} xs={12}>
            <TextItem name="Stack" value="stack" />
            <TextItem name="Queue" value="queue" />
            <TextItem name="Sorting" value="sorting" />
            <TextItem name="Tree" value="tree" />
            <TextItem name="Two Pointers" value="two-pointers" />
            <TextItem name="Dynamic Programming" value="dynamic-programming" />
        </Grid>
    </>
);

const Difficulty = () => (
    <>
        <StyledRowHeader item md={2} sm={3} xs={12}>
            <RowHeader name="Difficulty" icon={<PsychologyOutlinedIcon />} />
        </StyledRowHeader>
        <Grid item md={10} sm={9} xs={12}>
            <TextItem name="easy" value="easy" />
            <TextItem name="medium" value="medium" />
            <TextItem name="hard" value="hard" />
        </Grid>
    </>
);

const Company = () => {
    const { setSegments } = useProblems();
    return (
        <>
            <StyledRowHeader item md={2} sm={3} xs={12}>
                <RowHeader name="Company" icon={<BusinessOutlinedIcon />} />
            </StyledRowHeader>
            <Grid item md={10} sm={9} xs={12}>
                <ComponentItem child={<GoogleIcon />} value="google" segment={1} setSegments={setSegments} />
                <ComponentItem child={<AppleIcon />} value="apple" segment={2} setSegments={setSegments} />
                <ComponentItem child={<FacebookRoundedIcon />} value="facebook" segment={3} setSegments={setSegments} />
                <ComponentItem child={<TwitterIcon />} value="twitter" segment={4} setSegments={setSegments} />
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
                    <Category />
                    <Difficulty />
                    <Company />
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
};

export default Filters;
