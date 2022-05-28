import * as React from "react";
import { styled } from '@mui/material/styles';
import Logo from "../../Logo";
import { IconButton, Toolbar } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const LogoContainer = styled("div")({
    position: "fixed",
    top: 0
});

const Body = styled('main')(({ theme }) => ({
    border: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    flexGrow: 1,
    padding: theme.spacing(0),
}));

const NextContainer = styled("div")(({ }) => ({
    position: "fixed",
    bottom: 0,
    right: 0,
}));

const BeforeContainer = styled("div")(({ }) => ({
    position: "fixed",
    bottom: 0,
    left: 0,
}));

const GameWrapper: React.FC<{ children: JSX.Element }> = ({ children }) => (
    <Body>
        <LogoContainer>
            <Logo />
        </LogoContainer>
        {children}

        <BeforeContainer>
            <Toolbar>
                <IconButton>
                    <NavigateBeforeIcon />
                </IconButton>
            </Toolbar>
        </BeforeContainer>

        <NextContainer>
            <Toolbar>
                <IconButton>
                    <NavigateNextIcon />
                </IconButton>
            </Toolbar>
        </NextContainer>

    </Body>
);

export default GameWrapper;
