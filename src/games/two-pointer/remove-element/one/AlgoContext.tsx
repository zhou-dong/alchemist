import React from "react";
import { State } from "./AlgoState";
import { Action } from "./algo";

const AlgoContext = React.createContext<{
    state: State,
    setState: React.Dispatch<React.SetStateAction<State>>,
    index: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    actions: Action[],
    setActions: React.Dispatch<React.SetStateAction<Action[]>>
}>({
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
    const [actions, setActions] = React.useState<Action[]>([]);

    return (
        <AlgoContext.Provider value={{
            state,
            setState,
            index,
            setIndex,
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
