import { styled } from '@mui/material/styles';

const IFrame = styled("iframe")(() => ({
    border: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden"
}));

const Sorting = () => (
    <IFrame src="https://zhou-dong.github.io/alchemist-sort" />
);

export default Sorting;
