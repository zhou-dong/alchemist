import React from "react";
import { State } from "./AlgoState";
import { Action } from "./algo";

export const defaultValue = 1999;

const AlgoContext = React.createContext<{
    value: number,
    setValue: React.Dispatch<React.SetStateAction<number>>,
    state: State,
    setState: React.Dispatch<React.SetStateAction<State>>,
    index: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    actions: Action[],
    setActions: React.Dispatch<React.SetStateAction<Action[]>>
}>({
    value: +defaultValue,
    setValue: () => { },
    state: State.Typing,
    setState: () => { },
    index: 0,
    setIndex: () => { },
    actions: [],
    setActions: () => { }
});

export const AlgoContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [state, setState] = React.useState(State.Typing);
    const [index, setIndex] = React.useState(0);
    const [value, setValue] = React.useState(defaultValue);
    const [actions, setActions] = React.useState<Action[]>([]);

    return (
        <AlgoContext.Provider value={{
            state,
            setState,
            index,
            setIndex,
            value,
            setValue,
            actions,
            setActions
        }}>
            {children}
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
