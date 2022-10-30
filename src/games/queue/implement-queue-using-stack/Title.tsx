import Box from '@mui/material/Box';
import info from "./info";
import { Typography } from '@mui/material';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { useAlgoContext } from "./AlgoContext";

export default function Title() {

    const { success } = useAlgoContext();

    return (
        <Box sx={{
            position: "fixed",
            top: 40,
            flexGrow: 1,
            width: "100%",
            display: 'flex',
            alignItems: "center",
            justifyContent: "center",
        }}>
            <Typography variant='h5'>
                {info.name}
            </Typography>

            {success && <>&nbsp;<CheckCircleOutlineOutlinedIcon color='primary' /></>}
        </Box>
    );
}
