import { AppBar, Toolbar } from "@mui/material";
import MenuButton from './Menu';
import Logo from '../commons/Logo';
import { green } from "@mui/material/colors";

interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Main = ({ open, setOpen }: Props) => {

    return (
        <AppBar
            position="static"
            color="transparent"
            elevation={0}
            sx={{
                marginBottom: "20px",
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`
            }}
        >
            <Toolbar sx={{ '&.MuiToolbar-root': { paddingLeft: 0, paddingRight: 0 } }}>
                <div style={{ flexGrow: 1 }}>
                    <Logo color={green[600]} />
                </div>
                <MenuButton open={open} setOpen={setOpen} />
            </Toolbar>
        </AppBar>
    )
}

export default Main;
