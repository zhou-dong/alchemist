import { styled } from '@mui/material/styles';

const IFrame = styled("iframe")(() => ({
    border: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden"
}));


const DP = () => (
    <IFrame src="https://alchemist-al.com/edit-distance" />
);

export default DP;
