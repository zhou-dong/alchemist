import React from "react";
import { LinkedListNode } from "../../../data-structures/list/linked-list/node.three";
import { State } from "./AlgoState";

const AlgoContext = React.createContext<{
    state: State,
    setState: React.Dispatch<React.SetStateAction<State>>,
    index: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    displayCode: boolean,
    setDisplayCode: React.Dispatch<React.SetStateAction<boolean>>,
    head?: LinkedListNode<number | string>,
    setHead: React.Dispatch<React.SetStateAction<LinkedListNode<number | string> | undefined>>,
    dummyHead?: LinkedListNode<number | string>,
    setDummyHead: React.Dispatch<React.SetStateAction<LinkedListNode<number | string> | undefined>>,
    current?: LinkedListNode<number | string>,
    setCurrent: React.Dispatch<React.SetStateAction<LinkedListNode<number | string> | undefined>>,
    temp?: LinkedListNode<number | string>,
    setTemp: React.Dispatch<React.SetStateAction<LinkedListNode<number | string> | undefined>>,
    prev?: LinkedListNode<number | string>,
    setPrev: React.Dispatch<React.SetStateAction<LinkedListNode<number | string> | undefined>>,
    nextNext?: LinkedListNode<number | string>,
    setNextNext: React.Dispatch<React.SetStateAction<LinkedListNode<number | string> | undefined>>
}>({
    state: State.Typing,
    setState: () => { },
    index: 0,
    setIndex: () => { },
    displayCode: false,
    setDisplayCode: () => { },
    setHead: () => { },
    setDummyHead: () => { },
    setCurrent: () => { },
    setTemp: () => { },
    setPrev: () => { },
    setNextNext: () => { }
});

export const AlgoContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [state, setState] = React.useState(State.Typing);
    const [index, setIndex] = React.useState(0);
    const [displayCode, setDisplayCode] = React.useState(true);

    const [head, setHead] = React.useState<LinkedListNode<number | string>>();
    const [dummyHead, setDummyHead] = React.useState<LinkedListNode<number | string>>();
    const [current, setCurrent] = React.useState<LinkedListNode<number | string>>();
    const [temp, setTemp] = React.useState<LinkedListNode<number | string>>();
    const [prev, setPrev] = React.useState<LinkedListNode<number | string>>();
    const [nextNext, setNextNext] = React.useState<LinkedListNode<number | string>>();

    return (
        <AlgoContext.Provider value={{
            state,
            setState,
            index,
            setIndex,
            displayCode,
            setDisplayCode,
            head,
            setHead,
            dummyHead,
            setDummyHead,
            current,
            setCurrent,
            temp,
            setTemp,
            prev,
            setPrev,
            nextNext,
            setNextNext
        }}>
            {children}
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
