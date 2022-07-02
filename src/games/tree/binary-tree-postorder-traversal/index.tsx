import * as React from 'react';
import GameWrapper from "../../commons/GameWrapper";
import { Centered } from "../../dp/_components/Centered";
import Description from "../../dp/_components/Description";
import Formula from "../../dp/_components/Formula";
import { description, example, title, formula, usecases } from "./contents";
import { ThemeProvider, Typography } from '@mui/material';
import Refresh from "../../dp/_components/Refresh";
import { createTree } from "./init";
import theme from '../../dp/_commons/theme';
import info from "./info";
import Tree from '../_components/binary-tree';
import { PostOrderActions } from '../_components/binary-tree/actions';

const useWindowResize = (max: number) => {
    const [width, setWidth] = React.useState<number>(window.innerWidth);

    React.useEffect(() => {
        const updateWidth = () => setWidth(window.innerWidth);
        window.addEventListener('resize', updateWidth);
        updateWidth();
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    return Math.min(width, max);
};

const Main = () => {

    const [root, setRoot] = React.useState(createTree());
    const maxWidth = 1000;
    const heightUnit = 100;
    const width = useWindowResize(maxWidth);
    const height = root.depth * heightUnit;

    const handleRefresh = () => {
        setRoot(createTree());
    }

    return (
        <GameWrapper path={info.path}>
            <ThemeProvider theme={theme}>
                <Centered>
                    <div style={{ marginTop: "100px" }}></div>
                    <Typography variant='body1' display="inline-flex" sx={{ verticalAlign: 'middle' }}>
                        {title}
                    </Typography>
                    <div style={{ marginTop: "25px" }}>
                        <Description
                            success={false}
                            title={title}
                            example={example}
                            usecases={usecases}
                            description={description}
                        />
                        <Formula title={title} formula={formula} />
                        <Refresh handleRefresh={handleRefresh} />
                    </div>

                    <Tree
                        root={root}
                        svgHeight={height}
                        svgWidth={width}
                        heightUnit={heightUnit}
                        nodeRadius={20}
                        y={40}
                        challengeId={1}
                        actions={new PostOrderActions(root)}
                        leftTextContent="①LEFT"
                        middleTextContent="③PRINT"
                        rightTextContent="②RIGHT"
                        goLeftIndex={0}
                        printIndex={2}
                        goRightIndex={1}
                    />

                </Centered>
            </ThemeProvider>
        </GameWrapper>
    );
}

export default Main;
