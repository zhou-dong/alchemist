import React from "react";
import { State } from "./AlgoState";
import { Step } from "./game/algo";
import { Solution } from "./game/solution";

const AlgoContext = React.createContext<{
    state: State,
    setState: React.Dispatch<React.SetStateAction<State>>,
    index: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    table: (string | number)[][],
    setTable: React.Dispatch<React.SetStateAction<(string | number)[][]>>,
    tableStyle: React.CSSProperties[][],
    setTableStyle: React.Dispatch<React.SetStateAction<React.CSSProperties[][]>>,
    steps: Step[],
    setSteps: React.Dispatch<React.SetStateAction<Step[]>>,
    strs: string[],
    setStrs: React.Dispatch<React.SetStateAction<string[]>>,
    solution?: Solution,
    setSolution: React.Dispatch<React.SetStateAction<Solution | undefined>>,
}>({
    state: State.Welcome,
    setState: () => { },
    index: 0,
    setIndex: () => { },
    table: [],
    setTable: () => { },
    tableStyle: [],
    setTableStyle: () => { },
    steps: [],
    setSteps: () => { },
    strs: [],
    setStrs: () => { },
    setSolution: () => { },
});

export const AlgoContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [state, setState] = React.useState(State.Welcome);
    const [index, setIndex] = React.useState(0);

    const [table, setTable] = React.useState<(number | string)[][]>([]);
    const [tableStyle, setTableStyle] = React.useState<(React.CSSProperties)[][]>([]);
    const [steps, setSteps] = React.useState<Step[]>([]);

    const [strs, setStrs] = React.useState<string[]>([]);
    const [solution, setSolution] = React.useState<Solution>();

    return (
        <AlgoContext.Provider value={{
            state,
            setState,
            index,
            setIndex,
            table,
            setTable,
            tableStyle,
            setTableStyle,
            steps,
            setSteps,
            strs,
            setStrs,
            solution,
            setSolution,
        }}>
            {children}
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
