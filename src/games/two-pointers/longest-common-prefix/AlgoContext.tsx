import React from "react";
import { State } from "./AlgoState";
import { Step } from "./game/algo";
import { Solution } from "./game/solution";

const AlgoContext = React.createContext<{
    state: State,
    setState: React.Dispatch<React.SetStateAction<State>>,
    index: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    displayCode: boolean,
    setDisplayCode: React.Dispatch<React.SetStateAction<boolean>>,
    displayIntroduction: boolean,
    setDisplayIntroduction: React.Dispatch<React.SetStateAction<boolean>>,
    displayOverview: boolean,
    setDisplayOverview: React.Dispatch<React.SetStateAction<boolean>>,
    displayGame: boolean,
    setDisplayGame: React.Dispatch<React.SetStateAction<boolean>>,
    displayInput: boolean,
    setDisplayInput: React.Dispatch<React.SetStateAction<boolean>>,
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
    strs: string[],
    setStrs: React.Dispatch<React.SetStateAction<string[]>>,
    solution?: Solution,
    setSolution: React.Dispatch<React.SetStateAction<Solution | undefined>>,
}>({
    state: State.Welcome,
    setState: () => { },
    index: 0,
    setIndex: () => { },
    displayCode: false,
    setDisplayCode: () => { },
    displayIntroduction: true,
    setDisplayIntroduction: () => { },
    displayOverview: false,
    setDisplayOverview: () => { },
    displayGame: true,
    setDisplayGame: () => { },
    displayInput: false,
    setDisplayInput: () => { },
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
    strs: [],
    setStrs: () => { },
    setSolution: () => { },
});

export const AlgoContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [state, setState] = React.useState(State.Welcome);
    const [index, setIndex] = React.useState(0);

    const [displayIntroduction, setDisplayIntroduction] = React.useState(true);
    const [displayCode, setDisplayCode] = React.useState(false);
    const [displayOverview, setDisplayOverview] = React.useState(false);
    const [displayGame, setDisplayGame] = React.useState(true);
    const [displayInput, setDisplayInput] = React.useState(false);

    const [haystack, setHaystack] = React.useState("");
    const [needle, setNeedle] = React.useState("");

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
            displayCode,
            setDisplayCode,
            displayIntroduction,
            setDisplayIntroduction,
            displayOverview,
            setDisplayOverview,
            displayGame,
            setDisplayGame,
            displayInput,
            setDisplayInput,
            haystack,
            setHaystack,
            needle,
            setNeedle,
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
