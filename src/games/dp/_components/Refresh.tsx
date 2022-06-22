import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import { IconButton, Tooltip } from "@mui/material";

interface Props {
    handleRefresh: () => any;
}

const Main = ({ handleRefresh }: Props) => (
    <Tooltip title="REFRESH" placement="top">
        <IconButton onClick={handleRefresh}>
            <RefreshOutlinedIcon />
        </IconButton>
    </Tooltip>
);

export default Main;
