import React from "react";
import { Problem } from "./problem";
import { problems as allProblems } from "./problems";

const ProblemsContext = React.createContext<{
    problems: Problem[],
    setSegments: React.Dispatch<React.SetStateAction<number[]>>
}>({
    problems: [],
    setSegments: () => { }
});

export const useProblems = () => {
    return React.useContext(ProblemsContext);
};

const filterSegments = (segmentsOne: number[], segmentsTwo: number[]): boolean => {

    for (let i = 0; i < segmentsOne.length; i++) {
        if (segmentsTwo.includes(segmentsOne[i])) {
            return true;
        }
    }

    return false;
};

export const ProblemsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [problems, setProblems] = React.useState<Problem[]>(allProblems);
    const [segments, setSegments] = React.useState<number[]>([]);

    React.useEffect(() => {
        setProblems(
            () => {
                if (segments.length === 0) {
                    return allProblems;
                } else {
                    return allProblems.filter(problem => filterSegments(segments, problem.segments));
                }
            }
        )
    }, [segments]);

    return (
        <ProblemsContext.Provider value={{ problems, setSegments }}>
            {children}
        </ProblemsContext.Provider>
    );
};
