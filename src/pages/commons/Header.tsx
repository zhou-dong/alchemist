import { AppBar, Stack, Toolbar, Typography } from "@mui/material";
import MaterialLink from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import Logo from '../commons/Logo';
import BusinessIcon from '@mui/icons-material/Business';
import { green } from "@mui/material/colors";
import Search from "./Search";

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
                backgroundColor: green[400]
            }}>
                <Stack
                    direction="row"
                    spacing={5}
                    sx={{
                        alignItems: 'center',
                        flexGrow: 1
                    }}
                >
                    <Logo color="#fff" />
                    <MaterialLink
                        component={RouterLink}
                        sx={{
                            textDecoration: 'none',
                            fontWeight: "normal",
                            display: 'flex',
                            alignItems: 'center',
                            color: "#fff",
                        }}
                        to="/pages/categories"
                    >
                        <CategoryOutlinedIcon sx={{ marginRight: 1 }} />
                        <Typography variant="body1">
                            Categories
                        </Typography>
                    </MaterialLink>
                </Stack>

                <Stack
                    direction="row"
                    spacing={2}
                >
                    <Search />

                    <MaterialLink
                        component={RouterLink}
                        sx={{
                            textDecoration: 'none',
                            fontWeight: "normal",
                            display: 'flex',
                            alignItems: 'center',
                            color: "#fff",
                        }}
                        to="/pages/about-us"
                    >
                        <BusinessIcon sx={{ marginRight: 1 }} />
                        <Typography variant="body1">
                            About Us
                        </Typography>
                    </MaterialLink>

                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default Main;
