import * as React from "react";
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from "react-router-dom";
import Logo from "../../Logo";
import { IconButton, Toolbar } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useGames } from "./GamesContext";

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

const GameWrapper: React.FC<{ children: JSX.Element, name: string }> = ({ children, name }) => {
    const { games } = useGames();

    const index = games.map(game => game.name).indexOf(name);
    const previous = games[index - 1];
    const next = games[index + 1];

    return (
        <Body>
            <LogoContainer>
                <Logo />
            </LogoContainer>
            {children}

            <BeforeContainer>
                <Toolbar>
                    <IconButton component={RouterLink} to={previous ? previous.path : "/"} disabled={index <= 0}>
                        <NavigateBeforeIcon />
                    </IconButton>
                </Toolbar>
            </BeforeContainer>

            <NextContainer>
                <Toolbar>
                    <IconButton component={RouterLink} to={next ? next.path : "/"} disabled={index >= games.length - 1}>
                        <NavigateNextIcon />
                    </IconButton>
                </Toolbar>
            </NextContainer>
        </Body>
    )
};

export default GameWrapper;
