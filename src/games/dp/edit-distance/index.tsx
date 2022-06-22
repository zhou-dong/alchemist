import * as React from 'react';
import GameWrapper from "../../commons/GameWrapper";
import { Centered } from "../_components/Centered";
import DescriptionComponent from "../_components/Description";
import FormularComponent from "../_components/Formular";
import { description, example, title, formular, usecases } from "./contents";

const Formular = () => {
    const [openFormular, setOpenFormular] = React.useState(false);
    const handleCloseFormular = () => setOpenFormular(false);

    return (
        <FormularComponent
            title={title}
            openFormular={openFormular}
            formular={formular}
            handleCloseFormular={handleCloseFormular}
        />
    );
}

const Description = () => {
    const [openDescription, setOpenDescription] = React.useState(true);
    const handleCloseDescription = () => setOpenDescription(false);

    return (
        <DescriptionComponent
            title={title}
            openDialog={openDescription}
            example={example}
            usecases={usecases}
            description={description}
            handleCloseDialog={handleCloseDescription}
        />
    );
}

const EditDistance = () => {



    return (
        <GameWrapper path="/dp/edit-distance">
            <Centered>
                <>hello world Edit distance</>


                <Description />
                <Formular />
            </Centered>
        </GameWrapper>
    );
}

export default EditDistance;
