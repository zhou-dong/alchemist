import { AppBar, Stack, Toolbar, Typography } from "@mui/material";
import MaterialLink from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import Logo from '../commons/Logo';
import BusinessIcon from '@mui/icons-material/Business';
import { grey } from "@mui/material/colors";

const Main = () => {

    return (
        <AppBar
            position="static"
            color="transparent"
            elevation={0}
        >
            <Toolbar sx={{
                '&.MuiToolbar-root': {
                    paddingLeft: "40px",
                    paddingRight: "40px"
                },
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: "center",
            }}>
                <Stack
                    direction="row"
                    spacing={5}
                    sx={{
                        alignItems: 'center',
                        flexGrow: 1
                    }}
                >
                    <Logo />
                    <MaterialLink
                        component={RouterLink}
                        sx={{
                            textDecoration: 'none',
                            fontWeight: "normal",
                            display: 'flex',
                            alignItems: 'center',
                            color: grey[600]
                        }}
                        to="/pages/categories"
                    >
                        <CategoryOutlinedIcon sx={{ marginRight: 1 }} />
                        <Typography variant="body1">
                            Categories
                        </Typography>
                    </MaterialLink>
                </Stack>
                <MaterialLink
                    component={RouterLink}
                    sx={{
                        textDecoration: 'none',
                        fontWeight: "normal",
                        display: 'flex',
                        alignItems: 'center',
                        color: grey[600]
                    }}
                    to="pages/about-us"
                >
                    <BusinessIcon sx={{ marginRight: 1 }} />
                    About US
                </MaterialLink>
            </Toolbar>
        </AppBar>
    )
}

export default Main;
