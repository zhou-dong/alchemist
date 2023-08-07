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
    nums: number[],
    setNums: React.Dispatch<React.SetStateAction<number[]>>,
    target: number,
    setTarget: React.Dispatch<React.SetStateAction<number>>
}>({
    state: State.Playing,
    setState: () => { },
    steps: [],
    setSteps: () => { },
    index: 0,
    setIndex: () => { },
    nums: [],
    setNums: () => { },
    target: 0,
    setTarget: () => { },
});

export const AlgoContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [state, setState] = React.useState(State.Input);
    const [steps, setSteps] = React.useState<Step[]>([]);
    const [index, setIndex] = React.useState(0);
    const [nums, setNums] = React.useState<number[]>([]);
    const [target, setTarget] = React.useState(0);

    return (
        <AlgoContext.Provider value={{
            state,
            setState,
            steps,
            setSteps,
            index,
            setIndex,
            nums,
            setNums,
            target,
            setTarget
        }}>
            {children}
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
