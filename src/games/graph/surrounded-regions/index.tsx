import * as React from 'react';
import GameWrapper from "../../commons/GameWrapper";
import { Centered } from "../../dp/_components/Centered";
import Description from "../../dp/_components/Description";
import Formula from "../../dp/_components/Formula";
import { description, example, title, formula, usecases } from "./contents";
import { ThemeProvider, Typography } from '@mui/material';
import Steps from '../../dp/_components/Steps';
import Errors from '../../dp/_components/Errors';
import Refresh from "../../dp/_components/Refresh";
import theme from '../../dp/_commons/theme';
import info from "./info";
import { CheckCircleOutline } from '@mui/icons-material';
import { Step, buildBoard, buildSteps } from './algo';
import Grid from "./Grid";
import ActionPanel from './ActionPanel';

const Main = () => {

    const rows = 6;
    const cols = 6;

    const grid = buildBoard(rows, cols);
    const [steps, setSteps] = React.useState<Step[]>(() => buildSteps(grid));
    const [index, setIndex] = React.useState(0);
    const [stepsCount, setStepsCount] = React.useState(0);
    const [errorsCount, setErrorsCount] = React.useState(0);
    const [success, setSuccess] = React.useState(false);

    const handleRefresh = () => {
        const grid = buildBoard(rows, cols);
        setSteps(() => buildSteps(grid));
        setIndex(0);
        setErrorsCount(0);
        setStepsCount(0);
        setSuccess(false);
    }

    return (
        <GameWrapper path={info.path}>
            <ThemeProvider theme={theme}>
                <Centered>

                    <div style={{ marginTop: "100px" }} />

                    <Typography variant='body1' display="inline-flex" sx={{ verticalAlign: 'middle' }}>
                        {success && <CheckCircleOutline sx={{ color: 'green' }} />}{title}
                    </Typography>

                    <div style={{ marginTop: "0px" }}>
                        <Steps steps={stepsCount} />
                        <Errors errors={errorsCount} />
                        <Description
                            success={success}
                            title={title}
                            example={example}
                            usecases={usecases}
                            description={description}
                        />
                        <Formula title={title} formula={formula} />
                        <Refresh handleRefresh={handleRefresh} />
                    </div>

                    <Grid steps={steps} index={index} />

                    <ActionPanel
                        steps={steps}
                        index={index}
                        success={success}
                        setIndex={setIndex}
                        setStepsCount={setStepsCount}
                        setErrorsCount={setErrorsCount}
                        setSuccess={setSuccess}
                    />

                </Centered>
            </ThemeProvider>
        </GameWrapper>
    );
}

export default Main;
