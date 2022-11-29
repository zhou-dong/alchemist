import React from "react";
import { Compared, emptyCompared } from "./compared";

export enum Alignment { Play, Demo };
const defaultAlignment: Alignment = Alignment.Play;
export const defaultIndex = 0;
export const defaultSuccess = false;

const AlgoContext = React.createContext<{
    input: string,
    setInput: React.Dispatch<React.SetStateAction<string>>,
    index: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    success: boolean,
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>
    alignment: Alignment;
    setAlignment: React.Dispatch<React.SetStateAction<Alignment>>,
    compared: Compared,
    setCompared: React.Dispatch<React.SetStateAction<Compared>>,
}>({
    input: "",
    setInput: () => { },
    index: defaultIndex,
    setIndex: () => { },
    success: defaultSuccess,
    setSuccess: () => { },
    alignment: defaultAlignment,
    setAlignment: () => { },
    compared: emptyCompared,
    setCompared: () => { },
});

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};

export const AlgoContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [input, setInput] = React.useState("");
    const [index, setIndex] = React.useState(defaultIndex);
    const [success, setSuccess] = React.useState(defaultSuccess);
    const [alignment, setAlignment] = React.useState<Alignment>(defaultAlignment);
    const [compared, setCompared] = React.useState<Compared>(emptyCompared);

    return (
        <AlgoContext.Provider value={{
            input,
            setInput,
            index,
            setIndex,
            success,
            setSuccess,
            alignment,
            setAlignment,
            compared,
            setCompared,
        }}>
            {children}
        </AlgoContext.Provider>
    )
}
