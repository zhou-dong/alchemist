import React from "react";
import { IndexProps, LeftProps, RangeProps } from "./InputTable";

export enum Alignment { Play, Demo };
export const defaultAlignment: Alignment = Alignment.Play;
export const defaultInput = "abcabbcdef";
export const defaultIndex: IndexProps = { index: 0, show: false };
export const defaultLeft: LeftProps = { left: 0, show: false };
export const defaultRange: RangeProps = { range: { left: 0, right: 0 }, show: false };
export const defaultMax = 1;
export const defaultSuccess = false;
export const buildDefaultMap = () => { return new Map<string, number>() };

const AlgoContext = React.createContext<{
    input: string,
    setInput: React.Dispatch<React.SetStateAction<string>>,
    index: IndexProps,
    setIndex: React.Dispatch<React.SetStateAction<IndexProps>>,
    left: LeftProps,
    setLeft: React.Dispatch<React.SetStateAction<LeftProps>>,
    range: RangeProps,
    setRange: React.Dispatch<React.SetStateAction<RangeProps>>,
    max: number,
    setMax: React.Dispatch<React.SetStateAction<number>>,
    success: boolean,
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>
    map: Map<string, number>,
    setMap: React.Dispatch<React.SetStateAction<Map<string, number>>>,
    alignment: Alignment;
    setAlignment: React.Dispatch<React.SetStateAction<Alignment>>,
}>({
    input: "",
    setInput: () => { },
    index: defaultIndex,
    setIndex: () => { },
    left: defaultLeft,
    setLeft: () => { },
    range: defaultRange,
    setRange: () => { },
    max: defaultMax,
    setMax: () => { },
    success: defaultSuccess,
    setSuccess: () => { },
    map: buildDefaultMap(),
    setMap: () => { },
    alignment: defaultAlignment,
    setAlignment: () => { }
});

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};

export const AlgoContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [input, setInput] = React.useState(defaultInput);
    const [index, setIndex] = React.useState<IndexProps>(defaultIndex);
    const [left, setLeft] = React.useState<LeftProps>(defaultLeft);
    const [range, setRange] = React.useState<RangeProps>(defaultRange);
    const [max, setMax] = React.useState(defaultMax);
    const [success, setSuccess] = React.useState(defaultSuccess);
    const [map, setMap] = React.useState<Map<string, number>>(buildDefaultMap());
    const [alignment, setAlignment] = React.useState<Alignment>(defaultAlignment);

    return (
        <AlgoContext.Provider value={{
            input,
            setInput,
            index,
            setIndex,
            left,
            setLeft,
            range,
            setRange,
            max,
            setMax,
            success,
            setSuccess,
            map,
            setMap,
            alignment,
            setAlignment
        }}>
            {children}
        </AlgoContext.Provider>
    )
}
