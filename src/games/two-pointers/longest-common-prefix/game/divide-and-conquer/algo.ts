export enum Action {
    Standby,
    CheckIsInputEmpty,
    ReturnEmptyWithEmptyInput,
    BeginImplementation,
    ReturnLongestCommonPrefix,
    BeginDivideAndConquer,
    CompareStartWithEnd,
    ReturnDivideAndConquerBecauseStartEqualEnd,
    CalculateMid,
    ComputeLcpLeft,
    ReturnLcpLeft,
    ComputeLcpRight,
    ReturnLcpRight,
    DivideAndConquerBeginLcp,
    DivideAndConquerReturnLcp,
    BeginLcp,
    DefineIndex,
    BeginForCheckWhile,
    IndexPlusPlus,
    LcpReturnSubstring,
}

const getlinesToHighlight = (action: Action): number[] => {
    switch (action) {
        case Action.Standby: return [1];
        case Action.CheckIsInputEmpty: return [2];
        case Action.ReturnEmptyWithEmptyInput: return [3];
        case Action.BeginImplementation: return [5];
        case Action.ReturnLongestCommonPrefix: return [5];
        case Action.BeginDivideAndConquer: return [8];
        case Action.CompareStartWithEnd: return [9];
        case Action.ReturnDivideAndConquerBecauseStartEqualEnd: return [10];
        case Action.CalculateMid: return [12];
        case Action.ComputeLcpLeft: return [13];
        case Action.ReturnLcpLeft: return [13];
        case Action.ComputeLcpRight: return [14];
        case Action.ReturnLcpRight: return [14];
        case Action.DivideAndConquerBeginLcp: return [15];
        case Action.DivideAndConquerReturnLcp: return [15];
        case Action.BeginLcp: return [18];
        case Action.DefineIndex: return [19];
        case Action.BeginForCheckWhile: return [20, 21, 22, 23, 24];
        case Action.IndexPlusPlus: return [25];
        case Action.LcpReturnSubstring: return [27];
    }
}

export interface Step {
    readonly action: Action;
    readonly linesToHighlight: number[];
    readonly input: string[];
    readonly start?: number;
    readonly end?: number;
    readonly mid?: number;
    readonly lcpLeft?: string;
    readonly lcpRight?: string;
    readonly lcp?: string;
    readonly index?: number;
    readonly str1?: string;
    readonly str2?: string;
}

export const buildSteps = (input: string[]): Step[] => {

    const steps: Step[] = [];

    const baseStep: Step = { action: Action.Standby, linesToHighlight: [], input };

    function pushToStep(step: Step) {
        const linesToHighlight: number[] = getlinesToHighlight(step.action);
        steps.push({ ...step, linesToHighlight });
    }

    pushToStep({ ...baseStep, action: Action.Standby });
    function longestCommonPrefix(strs: string[]): string {

        pushToStep({ ...baseStep, action: Action.CheckIsInputEmpty });
        if (strs.length === 0) {
            pushToStep({ ...baseStep, action: Action.ReturnEmptyWithEmptyInput });
            return "";
        }

        pushToStep({ ...baseStep, action: Action.BeginImplementation });
        const result = divideAndConquer(strs, 0, strs.length - 1);
        pushToStep({ ...baseStep, action: Action.ReturnLongestCommonPrefix });
        return result;
    }

    function divideAndConquer(strs: string[], start: number, end: number): string {
        pushToStep({ ...baseStep, action: Action.BeginDivideAndConquer });

        pushToStep({ ...baseStep, action: Action.CompareStartWithEnd });
        if (start === end) {
            pushToStep({ ...baseStep, action: Action.ReturnDivideAndConquerBecauseStartEqualEnd });
            return strs[start];
        }

        const mid = start + Math.floor((end - start) / 2);
        pushToStep({ ...baseStep, action: Action.CalculateMid });

        pushToStep({ ...baseStep, action: Action.ComputeLcpLeft });
        const lcpLeft = divideAndConquer(strs, start, mid);
        pushToStep({ ...baseStep, action: Action.ReturnLcpLeft });

        pushToStep({ ...baseStep, action: Action.ComputeLcpRight });
        const lcpRight = divideAndConquer(strs, mid + 1, end);
        pushToStep({ ...baseStep, action: Action.ReturnLcpRight });

        pushToStep({ ...baseStep, action: Action.DivideAndConquerBeginLcp });
        const result = lcp(lcpLeft, lcpRight);

        pushToStep({ ...baseStep, action: Action.DivideAndConquerReturnLcp });
        return result;
    }

    function lcp(str1: string, str2: string): string {
        pushToStep({ ...baseStep, action: Action.BeginLcp });

        let index = 0;
        pushToStep({ ...baseStep, action: Action.DefineIndex });

        pushToStep({ ...baseStep, action: Action.BeginForCheckWhile });
        while (
            index < str1.length &&
            index < str2.length &&
            str1.charAt(index) === str2.charAt(index)
        ) {
            index++;
            pushToStep({ ...baseStep, action: Action.IndexPlusPlus });

            pushToStep({ ...baseStep, action: Action.BeginForCheckWhile });
        }

        const result = str1.substring(0, index);
        pushToStep({ ...baseStep, action: Action.LcpReturnSubstring });
        return result;
    }

    longestCommonPrefix(input);
    return steps;
}
