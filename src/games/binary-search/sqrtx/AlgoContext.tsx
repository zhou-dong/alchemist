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
    x: number,
    setX: React.Dispatch<React.SetStateAction<number>>,
    sqrt: number,
    setSqrt: React.Dispatch<React.SetStateAction<number>>,
}>({
    state: State.Playing,
    setState: () => { },
    steps: [],
    setSteps: () => { },
    index: 0,
    setIndex: () => { },
    x: 0,
    setX: () => { },
    sqrt: 0,
    setSqrt: () => { }
});

export const AlgoContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [state, setState] = React.useState(State.Input);
    const [steps, setSteps] = React.useState<Step[]>([]);
    const [x, setX] = React.useState(0);
    const [index, setIndex] = React.useState(0);
    const [sqrt, setSqrt] = React.useState(0);

    return (
        <AlgoContext.Provider value={{
            state,
            setState,
            steps,
            setSteps,
            index,
            setIndex,
            x,
            setX,
            sqrt,
            setSqrt
        }}>
            {children}
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
