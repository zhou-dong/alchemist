import * as React from 'react';
import { AssignmentOutlined, CheckCircleOutline, Code } from '@mui/icons-material';
import GameWrapper from "../../commons/GameWrapper";
import { Centered } from "../_components/Centered";
import DescriptionComponent from "../_components/Description";
import FormularComponent from "../_components/Formular";
import { description, example, title, formular, usecases } from "./contents";
import { IconButton, Tooltip } from '@mui/material';
import Steps from '../_components/Steps';
import Errors from '../_components/Errors';

const Formular = () => {
    const [openFormular, setOpenFormular] = React.useState(false);
    const handleOpenFormular = () => setOpenFormular(true);
    const handleCloseFormular = () => setOpenFormular(false);

    return (
        <>
            <Tooltip title="CODE" placement='top'>
                <IconButton onClick={handleOpenFormular}>
                    <Code />
                </IconButton>
            </Tooltip>
            <FormularComponent
                title={title}
                openFormular={openFormular}
                formular={formular}
                handleCloseFormular={handleCloseFormular}
            />
        </>
    );
}

const Description: React.FC<{ success: boolean }> = ({ success }) => {
    const [openDescription, setOpenDescription] = React.useState(false);
    const handleOpenDescription = () => setOpenDescription(true);
    const handleCloseDescription = () => setOpenDescription(false);

    return (
        <>
            <Tooltip title="DESCRIPTION" placement="top">
                <IconButton onClick={handleOpenDescription}>
                    {success ? <CheckCircleOutline sx={{ color: 'green' }} /> : <AssignmentOutlined />}
                </IconButton>
            </Tooltip>
            <DescriptionComponent
                title={title}
                openDialog={openDescription}
                example={example}
                usecases={usecases}
                description={description}
                handleCloseDialog={handleCloseDescription}
            />
        </>
    );
}

const EditDistance = () => {

    const [steps, setSteps] = React.useState(0);
    const [errors, setErrors] = React.useState(0);
    const [success, setSuccess] = React.useState(false);

    return (
        <GameWrapper path="/dp/edit-distance">
            <Centered>
                <Steps steps={steps} />
                <Errors errors={errors} />
                <Description success={success} />
                <Formular />
            </Centered>
        </GameWrapper>
    );
}

export default EditDistance;
