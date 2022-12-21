import React from "react";
import { State } from "./AlgoState";
import { Item } from "./algo";

export const defaultValue = "MCMXCIV";

const AlgoContext = React.createContext<{
    input: string,
    setInput: React.Dispatch<React.SetStateAction<string>>,
    state: State,
    setState: React.Dispatch<React.SetStateAction<State>>,
    index: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    result: Item[],
    setResult: React.Dispatch<React.SetStateAction<Item[]>>,
}>({
    input: defaultValue,
    setInput: () => { },
    state: State.Typing,
    setState: () => { },
    index: 0,
    setIndex: () => { },
    result: [],
    setResult: () => { },
});

export const AlgoContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [state, setState] = React.useState(State.Typing);
    const [input, setInput] = React.useState(defaultValue);
    const [result, setResult] = React.useState<Item[]>([]);
    const [index, setIndex] = React.useState(0);

    return (
        <AlgoContext.Provider value={{
            input,
            setInput,
            state,
            setState,
            index,
            setIndex,
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
