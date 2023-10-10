import React from "react";
import { State } from "./AlgoState";

export const defaultValue = 1999;

const AlgoContext = React.createContext<{
    value: number,
    setValue: React.Dispatch<React.SetStateAction<number>>,
    state: State,
    setState: React.Dispatch<React.SetStateAction<State>>,
    index: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    digits: number[],
    setDigits: React.Dispatch<React.SetStateAction<number[]>>,
    carrier: number,
    setCarrier: React.Dispatch<React.SetStateAction<number>>,
    temp?: number,
    setTemp: React.Dispatch<React.SetStateAction<number | undefined>>,
    digit?: number,
    setDigit: React.Dispatch<React.SetStateAction<number | undefined>>
}>({
    value: +defaultValue,
    setValue: () => { },
    state: State.Typing,
    setState: () => { },
    index: 0,
    setIndex: () => { },
    digits: [],
    setDigits: () => { },
    carrier: 1,
    setCarrier: () => { },
    setTemp: () => { },
    setDigit: () => { }
});

export const AlgoContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [state, setState] = React.useState(State.Typing);
    const [index, setIndex] = React.useState(0);
    const [value, setValue] = React.useState(defaultValue);
    const [digits, setDigits] = React.useState<number[]>([]);
    const [carrier, setCarrier] = React.useState(1);
    const [temp, setTemp] = React.useState<number>();
    const [digit, setDigit] = React.useState<number>();

    return (
        <AlgoContext.Provider value={{
            state,
            setState,
            index,
            setIndex,
            value,
            setValue,
            digits,
            setDigits,
            carrier,
            setCarrier,
            temp,
            setTemp,
            digit,
            setDigit
        }}>
            {children}
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
