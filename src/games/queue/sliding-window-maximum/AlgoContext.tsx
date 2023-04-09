import React from "react";
import { State } from "./AlgoState";
import { Step } from "./algo";

const AlgoContext = React.createContext<{
    state: State,
    setState: React.Dispatch<React.SetStateAction<State>>,

    input: number[],
    setInput: React.Dispatch<React.SetStateAction<number[]>>,
    index: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    k: number,
    setK: React.Dispatch<React.SetStateAction<number>>,
    steps: Step[],
    setSteps: React.Dispatch<React.SetStateAction<Step[]>>
}>({
    state: State.Typing,
    setState: () => { },
    input: [],
    setInput: () => { },
    index: 0,
    setIndex: () => { },
    k: 0,
    setK: () => { },
    steps: [],
    setSteps: () => { }
});

export const AlgoContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [state, setState] = React.useState(State.Typing);
    const [input, setInput] = React.useState<number[]>([]);
    const [index, setIndex] = React.useState<number>(0);
    const [k, setK] = React.useState<number>(0);
    const [steps, setSteps] = React.useState<Step[]>([]);

    return (
        <AlgoContext.Provider value={{
            state,
            setState,
            input,
            setInput,
            index,
            setIndex,
            k,
            setK,
            steps,
            setSteps
        }}>
            {children}
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
