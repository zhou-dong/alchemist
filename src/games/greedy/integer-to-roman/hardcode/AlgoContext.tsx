import React from "react";
import { State } from "../_common/AlgoState";

export const defaultInput: number = 1999;

const AlgoContext = React.createContext<{
    input: number,
    setInput: React.Dispatch<React.SetStateAction<number>>,
    state: State,
    setState: React.Dispatch<React.SetStateAction<State>>,
}>({
    input: defaultInput,
    setInput: () => { },
    state: State.Typing,
    setState: () => { }
});

export const AlgoContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [state, setState] = React.useState(State.Typing);
    const [input, setInput] = React.useState(defaultInput);

    return (
        <AlgoContext.Provider value={{
            input,
            setInput,
            state,
            setState,
        }}>
            {children}
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
