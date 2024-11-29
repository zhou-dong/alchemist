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

    function pushToStep(
        action: Action,
        start?: number,
        end?: number,
        mid?: number,
        lcpLeft?: string,
        lcpRight?: string,
        lcp?: string,
        index?: number,
        str1?: string,
        str2?: string,
    ) {
        const linesToHighlight: number[] = getlinesToHighlight(action);
        steps.push({ action, linesToHighlight, input, start, end, mid, lcpLeft, lcpRight, lcp, index, str1, str2, });
    }

    pushToStep(Action.Standby);
    function longestCommonPrefix(strs: string[]): string {

        pushToStep(Action.CheckIsInputEmpty);
        if (strs.length === 0) {
            pushToStep(Action.ReturnEmptyWithEmptyInput);
            return "";
        }

        pushToStep(Action.ReturnEmptyWithEmptyInput);
        return divideAndConquer(strs, 0, strs.length - 1);
    }

    function divideAndConquer(strs: string[], start: number, end: number): string {
        if (start === end) {
            return strs[start];
        }
        const mid = start + Math.floor((end - start) / 2);
        const lcpLeft = divideAndConquer(strs, start, mid);
        const lcpRight = divideAndConquer(strs, mid + 1, end);
        return lcp(lcpLeft, lcpRight);
    }

    function lcp(str1: string, str2: string): string {
        let index = 0;
        while (
            index < str1.length &&
            index < str2.length &&
            str1.charAt(index) === str2.charAt(index)
        ) {
            index++;
        }
        return str1.substring(0, index);
    }

    return steps;
}
