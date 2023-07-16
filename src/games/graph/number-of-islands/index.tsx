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
import { Step, buildGrid, buildSteps } from './algo';
import Grid from "./Grid";
import ActionPanel from './ActionPanel';
import Dashboard from "./Dashboard";

const Main = () => {

    const rows = 6;
    const cols = 6;

    const grid = buildGrid(rows, cols);
    const [steps, setSteps] = React.useState<Step[]>(() => buildSteps(grid));
    const [index, setIndex] = React.useState(0);
    const [stepsCount, setStepsCount] = React.useState(0);
    const [errorsCount, setErrorsCount] = React.useState(0);
    const [success, setSuccess] = React.useState(false);

    const handleRefresh = () => {
        const grid = buildGrid(rows, cols);
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
                    <div style={{ marginTop: "100px" }}></div>
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

                    <div style={{ marginTop: "20px" }}>
                        <Dashboard />
                    </div>

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
