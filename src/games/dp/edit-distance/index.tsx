import * as React from 'react';
import { AssignmentOutlined, CheckCircleOutline, Code } from '@mui/icons-material';
import GameWrapper from "../../commons/GameWrapper";
import { Centered } from "../_components/Centered";
import Description from "../_components/Description";
import Formular from "../_components/Formular";
import { description, example, title, formular, usecases } from "./contents";
import { IconButton, Tooltip } from '@mui/material';
import Steps from '../_components/Steps';
import Errors from '../_components/Errors';

const EditDistance = () => {

    const [steps, setSteps] = React.useState(0);
    const [errors, setErrors] = React.useState(0);
    const [success, setSuccess] = React.useState(false);

    return (
        <GameWrapper path="/dp/edit-distance">
            <Centered>
                <Steps steps={steps} />
                <Errors errors={errors} />
                <Description success={success} title={title} example={example} usecases={usecases} description={description} />
                <Formular title={title} formular={formular} />
            </Centered>
        </GameWrapper>
    );
}

export default EditDistance;
