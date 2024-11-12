import React from "react";
import { State } from "./AlgoState";
import { Step } from "./game/algo";
import { Step as HorizontalScanningStep } from "./game/horizontal-scanning/algo";
import { Step as VerticalScanningSteps } from "./game/vertical-scanning/algo";
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
    solution: Solution,
    setSolution: React.Dispatch<React.SetStateAction<Solution>>,
    linesToHighlights: number[][],
    setLinesToHighlights: React.Dispatch<React.SetStateAction<number[][]>>,
    horizontalScanningSteps: HorizontalScanningStep[],
    setHorizontalScanningSteps: React.Dispatch<React.SetStateAction<HorizontalScanningStep[]>>,
    verticalScanningSteps: VerticalScanningSteps[],
    setVerticalScanningSteps: React.Dispatch<React.SetStateAction<VerticalScanningSteps[]>>,
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
    solution: Solution.HorizontalScanning,
    setSolution: () => { },
    linesToHighlights: [],
    setLinesToHighlights: () => { },
    horizontalScanningSteps: [],
    setHorizontalScanningSteps: () => { },
    verticalScanningSteps: [],
    setVerticalScanningSteps: () => { },
});

export const AlgoContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {


    // case Solution.HorizontalScanning: return <HorizontalScanning />;
    // case Solution.VerticalScanning: return <VerticalScanning />;
    // case Solution.DivideAndConquer: return <DivideAndConquer />;
    // case Solution.BinarySearch: return <BinarySearch />;

    const [state, setState] = React.useState(State.Welcome);
    const [index, setIndex] = React.useState(0);
    const [steps, setSteps] = React.useState<Step[]>([]);

    const [horizontalScanningSteps, setHorizontalScanningSteps] = React.useState<HorizontalScanningStep[]>([]);
    const [verticalScanningSteps, setVerticalScanningSteps] = React.useState<VerticalScanningSteps[]>([]);

    const [table, setTable] = React.useState<(number | string)[][]>([]);
    const [tableStyle, setTableStyle] = React.useState<(React.CSSProperties)[][]>([]);

    const [strs, setStrs] = React.useState<string[]>([]);
    const [solution, setSolution] = React.useState<Solution>(Solution.HorizontalScanning);

    const [linesToHighlights, setLinesToHighlights] = React.useState<number[][]>([]);

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
            linesToHighlights,
            setLinesToHighlights,
            horizontalScanningSteps,
            setHorizontalScanningSteps,
            verticalScanningSteps,
            setVerticalScanningSteps,
        }}>
            {children}
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
