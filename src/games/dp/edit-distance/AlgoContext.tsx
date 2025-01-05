import React from "react";
import { State } from "./AlgoState";
import { Point } from "../_commons/point";
import { startPoint } from "./init";

const AlgoContext = React.createContext<{
    state: State,
    setState: React.Dispatch<React.SetStateAction<State>>,
    string1: string,
    setString1: React.Dispatch<React.SetStateAction<string>>,
    string2: string,
    setString2: React.Dispatch<React.SetStateAction<string>>,
    table: (string | number)[][],
    setTable: React.Dispatch<React.SetStateAction<(string | number)[][]>>,
    tableStyle: React.CSSProperties[][],
    setTableStyle: React.Dispatch<React.SetStateAction<React.CSSProperties[][]>>,
    buttons: number[],
    setButtons: React.Dispatch<React.SetStateAction<number[]>>,
    buttonsStyles: React.CSSProperties[],
    setButtonsStyles: React.Dispatch<React.SetStateAction<React.CSSProperties[]>>,
    comparedTable: (string | number)[][],
    setComparedTable: React.Dispatch<React.SetStateAction<(string | number)[][]>>,
    current: Point,
    setCurrent: React.Dispatch<React.SetStateAction<Point>>,
    success: boolean,
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
    steps: number,
    setSteps: React.Dispatch<React.SetStateAction<number>>,
    errors: number,
    setErrors: React.Dispatch<React.SetStateAction<number>>,
}>({
    state: State.Welcome,
    setState: () => { },
    string1: "",
    setString1: () => { },
    string2: "",
    setString2: () => { },
    table: [],
    setTable: () => { },
    tableStyle: [],
    setTableStyle: () => { },
    buttons: [],
    setButtons: () => { },
    buttonsStyles: [],
    setButtonsStyles: () => { },
    comparedTable: [],
    setComparedTable: () => { },
    current: startPoint,
    setCurrent: () => { },
    success: false,
    setSuccess: () => { },
    steps: 0,
    setSteps: () => { },
    errors: 0,
    setErrors: () => { },
});

export const AlgoContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [state, setState] = React.useState(State.Welcome);

    const [string1, setString1] = React.useState("");
    const [string2, setString2] = React.useState("");

    const [table, setTable] = React.useState<(number | string)[][]>([]);
    const [tableStyle, setTableStyle] = React.useState<(React.CSSProperties)[][]>([]);

    const [buttons, setButtons] = React.useState<(number)[]>([]);
    const [buttonsStyles, setButtonsStyles] = React.useState<(React.CSSProperties)[]>([]);

    const [comparedTable, setComparedTable] = React.useState<(number | string)[][]>([]);
    const [current, setCurrent] = React.useState<Point>(startPoint);
    const [success, setSuccess] = React.useState(false);
    const [steps, setSteps] = React.useState(0);
    const [errors, setErrors] = React.useState(0);

    return (
        <AlgoContext.Provider value={{
            state,
            setState,
            string1,
            setString1,
            string2,
            setString2,
            table,
            setTable,
            tableStyle,
            setTableStyle,
            buttons,
            setButtons,
            buttonsStyles,
            setButtonsStyles,
            comparedTable,
            setComparedTable,
            current,
            setCurrent,
            success,
            setSuccess,
            steps,
            setSteps,
            errors,
            setErrors,
        }}>
            {children}
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
