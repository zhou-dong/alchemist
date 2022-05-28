import * as React from "react";
import { styled } from '@mui/material/styles';
import Logo from "../../Logo";

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

const GameWrapper: React.FC<{ children: JSX.Element }> = ({ children }) => (
    <Body>
        <LogoContainer>
            <Logo />
        </LogoContainer>
        {children}
    </Body>
);

export default GameWrapper;
