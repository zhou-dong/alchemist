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
        pushToStep({ ...baseStep, action: Action.BeginDivideAndConquer, start, end });

        pushToStep({ ...baseStep, action: Action.CompareStartWithEnd, start, end });
        if (start === end) {
            pushToStep({ ...baseStep, action: Action.ReturnDivideAndConquerBecauseStartEqualEnd, start, end });
            return strs[start];
        }

        const mid = start + Math.floor((end - start) / 2);
        pushToStep({ ...baseStep, action: Action.CalculateMid, start, end, mid });

        pushToStep({ ...baseStep, action: Action.ComputeLcpLeft, start, end, mid });
        const lcpLeft = divideAndConquer(strs, start, mid);
        pushToStep({ ...baseStep, action: Action.ReturnLcpLeft, start, end, mid, lcpLeft });

        pushToStep({ ...baseStep, action: Action.ComputeLcpRight, start, end, mid, lcpLeft });
        const lcpRight = divideAndConquer(strs, mid + 1, end);
        pushToStep({ ...baseStep, action: Action.ReturnLcpRight, start, end, mid, lcpLeft, lcpRight });

        pushToStep({ ...baseStep, action: Action.DivideAndConquerBeginLcp, start, end, mid, lcpLeft, lcpRight });
        const result = lcp(lcpLeft, lcpRight);

        pushToStep({ ...baseStep, action: Action.DivideAndConquerReturnLcp, start, end, mid, lcpLeft, lcpRight, lcp: result });
        return result;
    }

    function lcp(str1: string, str2: string): string {
        pushToStep({ ...baseStep, action: Action.BeginLcp, str1, str2 });

        let index = 0;
        pushToStep({ ...baseStep, action: Action.DefineIndex, str1, str2, index });

        pushToStep({ ...baseStep, action: Action.BeginForCheckWhile, str1, str2, index });
        while (
            index < str1.length &&
            index < str2.length &&
            str1.charAt(index) === str2.charAt(index)
        ) {
            index++;
            pushToStep({ ...baseStep, action: Action.IndexPlusPlus, str1, str2, index });

            pushToStep({ ...baseStep, action: Action.BeginForCheckWhile, str1, str2, index });
        }

        const result = str1.substring(0, index);
        pushToStep({ ...baseStep, action: Action.LcpReturnSubstring, str1, str2, index, lcp: result });
        return result;
    }

    longestCommonPrefix(input);
    return steps;
}
