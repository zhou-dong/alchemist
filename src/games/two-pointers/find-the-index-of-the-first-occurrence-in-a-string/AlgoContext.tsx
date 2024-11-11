import React from "react";
import { State } from "./AlgoState";
import { Step } from "./game/algo";

const AlgoContext = React.createContext<{
    state: State,
    setState: React.Dispatch<React.SetStateAction<State>>,
    index: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    haystack: string,
    setHaystack: React.Dispatch<React.SetStateAction<string>>,
    needle: string,
    setNeedle: React.Dispatch<React.SetStateAction<string>>,
    table: (string | number)[][],
    setTable: React.Dispatch<React.SetStateAction<(string | number)[][]>>,
    tableStyle: React.CSSProperties[][],
    setTableStyle: React.Dispatch<React.SetStateAction<React.CSSProperties[][]>>,
    steps: Step[],
    setSteps: React.Dispatch<React.SetStateAction<Step[]>>,
}>({
    state: State.Welcome,
    setState: () => { },
    index: 0,
    setIndex: () => { },
    haystack: "",
    setHaystack: () => { },
    needle: "",
    setNeedle: () => { },
    table: [],
    setTable: () => { },
    tableStyle: [],
    setTableStyle: () => { },
    steps: [],
    setSteps: () => { },
});

export const AlgoContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [state, setState] = React.useState(State.Welcome);
    const [index, setIndex] = React.useState(0);

    const [haystack, setHaystack] = React.useState("");
    const [needle, setNeedle] = React.useState("");

    const [table, setTable] = React.useState<(number | string)[][]>([]);
    const [tableStyle, setTableStyle] = React.useState<(React.CSSProperties)[][]>([]);
    const [steps, setSteps] = React.useState<Step[]>([]);

    return (
        <AlgoContext.Provider value={{
            state,
            setState,
            index,
            setIndex,
            haystack,
            setHaystack,
            needle,
            setNeedle,
            table,
            setTable,
            tableStyle,
            setTableStyle,
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
