import React from "react";
import { Compared, emptyCompared } from "./compared";

export const defaultIndex = 0;
export const defaultMapIndex = -1;
export const defaultSuccess = false;

const AlgoContext = React.createContext<{
    input: string,
    setInput: React.Dispatch<React.SetStateAction<string>>,
    index: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    success: boolean,
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>
    compared: Compared,
    setCompared: React.Dispatch<React.SetStateAction<Compared>>,
    mapIndex: number,
    setMapIndex: React.Dispatch<React.SetStateAction<number>>
}>({
    input: "",
    setInput: () => { },
    index: defaultIndex,
    setIndex: () => { },
    success: defaultSuccess,
    setSuccess: () => { },
    compared: emptyCompared,
    setCompared: () => { },
    mapIndex: defaultMapIndex,
    setMapIndex: () => { }
});

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};

export const AlgoContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [input, setInput] = React.useState("");
    const [index, setIndex] = React.useState(defaultIndex);
    const [success, setSuccess] = React.useState(defaultSuccess);
    const [compared, setCompared] = React.useState<Compared>(emptyCompared);
    const [mapIndex, setMapIndex] = React.useState(defaultMapIndex);

    return (
        <AlgoContext.Provider value={{
            input,
            setInput,
            index,
            setIndex,
            success,
            setSuccess,
            compared,
            setCompared,
            mapIndex,
            setMapIndex
        }}>
            {children}
        </AlgoContext.Provider>
    )
}
