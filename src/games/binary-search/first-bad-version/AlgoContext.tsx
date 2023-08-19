import React from "react";
import { State } from "./AlgoState";
import { Step } from "./algo";

const AlgoContext = React.createContext<{
    state: State,
    setState: React.Dispatch<React.SetStateAction<State>>,
    steps: Step[],
    setSteps: React.Dispatch<React.SetStateAction<Step[]>>,
    index: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    n?: number,
    setN: React.Dispatch<React.SetStateAction<number | undefined>>,
    bad?: number,
    setBad: React.Dispatch<React.SetStateAction<number | undefined>>,
}>({
    state: State.Playing,
    setState: () => { },
    steps: [],
    setSteps: () => { },
    index: 0,
    setIndex: () => { },
    setN: () => { },
    setBad: () => { },
});

export const AlgoContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [state, setState] = React.useState(State.Input);
    const [steps, setSteps] = React.useState<Step[]>([]);
    const [index, setIndex] = React.useState(0);
    const [n, setN] = React.useState<number>();
    const [bad, setBad] = React.useState<number>();

    return (
        <AlgoContext.Provider value={{
            state,
            setState,
            steps,
            setSteps,
            index,
            setIndex,
            n,
            setN,
            bad,
            setBad
        }}>
            {children}
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
