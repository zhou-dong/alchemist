import React from "react";
import { State } from "./AlgoState";

export const defaultNumRows = 3;
export const defaultInputString = "alchemist";

const AlgoContext = React.createContext<{
    state: State,
    setState: React.Dispatch<React.SetStateAction<State>>,
    numRows: number,
    setNumRows: React.Dispatch<React.SetStateAction<number>>,
    inputString: string,
    setInputString: React.Dispatch<React.SetStateAction<string>>,
    index: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    rows: (string | number)[][],
    setRows: React.Dispatch<React.SetStateAction<(string | number)[][]>>
    flag: number,
    setFlag: React.Dispatch<React.SetStateAction<number>>,
    row: number,
    setRow: React.Dispatch<React.SetStateAction<number>>,
    converted: string,
    setConverted: React.Dispatch<React.SetStateAction<string>>,
}>({
    state: State.Typing,
    setState: () => { },
    numRows: defaultNumRows,
    setNumRows: () => { },
    inputString: "",
    setInputString: () => { },
    index: 0,
    setIndex: () => { },
    rows: [],
    setRows: () => { },
    flag: -1,
    setFlag: () => { },
    row: 0,
    setRow: () => { },
    converted: "",
    setConverted: () => { },
});

export const AlgoContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [state, setState] = React.useState(State.Typing);
    const [numRows, setNumRows] = React.useState(defaultNumRows);
    const [inputString, setInputString] = React.useState(defaultInputString);
    const [index, setIndex] = React.useState(0);
    const [row, setRow] = React.useState(0);
    const [rows, setRows] = React.useState<(string | number)[][]>([]);
    const [flag, setFlag] = React.useState(-1);
    const [converted, setConverted] = React.useState<string>("");

    return (
        <AlgoContext.Provider value={{
            state,
            setState,
            numRows,
            setNumRows,
            inputString,
            setInputString,
            index,
            setIndex,
            rows,
            setRows,
            flag,
            setFlag,
            row,
            setRow,
            converted,
            setConverted
        }}>
            {children}
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
