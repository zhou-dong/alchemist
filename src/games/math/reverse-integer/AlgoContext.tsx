import React from "react";
import { State } from "./AlgoState";
import { Result, defaultResult } from "./algo";

export const defaultValue = 123;

const AlgoContext = React.createContext<{
    value: number,
    setValue: React.Dispatch<React.SetStateAction<number>>,
    state: State,
    setState: React.Dispatch<React.SetStateAction<State>>,
    index: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    converted: number,
    setConverted: React.Dispatch<React.SetStateAction<number>>,
    result: Result,
    setResult: React.Dispatch<React.SetStateAction<Result>>,
}>({
    value: defaultValue,
    setValue: () => { },
    state: State.Typing,
    setState: () => { },
    index: 0,
    setIndex: () => { },
    converted: 0,
    setConverted: () => { },
    result: defaultResult,
    setResult: () => { },
});

export const AlgoContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [state, setState] = React.useState(State.Typing);
    const [index, setIndex] = React.useState(0);
    const [value, setValue] = React.useState(defaultValue);
    const [converted, setConverted] = React.useState(0);
    const [result, setResult] = React.useState<Result>(defaultResult);

    return (
        <AlgoContext.Provider value={{
            state,
            setState,
            index,
            setIndex,
            value,
            setValue,
            converted,
            setConverted,
            result,
            setResult,
        }}>
            {children}
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
