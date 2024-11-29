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

        pushToStep(Action.BeginImplementation);
        const result = divideAndConquer(strs, 0, strs.length - 1);
        pushToStep(Action.ReturnLongestCommonPrefix);
        return result;
    }

    function divideAndConquer(strs: string[], start: number, end: number): string {
        pushToStep(Action.BeginDivideAndConquer);

        pushToStep(Action.CompareStartWithEnd);
        if (start === end) {
            pushToStep(Action.ReturnDivideAndConquerBecauseStartEqualEnd);
            return strs[start];
        }

        const mid = start + Math.floor((end - start) / 2);
        pushToStep(Action.CalculateMid);

        pushToStep(Action.ComputeLcpLeft);
        const lcpLeft = divideAndConquer(strs, start, mid);
        pushToStep(Action.ReturnLcpLeft);

        pushToStep(Action.ComputeLcpRight);
        const lcpRight = divideAndConquer(strs, mid + 1, end);
        pushToStep(Action.ReturnLcpRight);

        pushToStep(Action.DivideAndConquerBeginLcp);
        const result = lcp(lcpLeft, lcpRight);

        pushToStep(Action.DivideAndConquerReturnLcp);
        return result;
    }

    function lcp(str1: string, str2: string): string {
        pushToStep(Action.BeginLcp);

        let index = 0;
        pushToStep(Action.DefineIndex);

        pushToStep(Action.BeginForCheckWhile);
        while (
            index < str1.length &&
            index < str2.length &&
            str1.charAt(index) === str2.charAt(index)
        ) {
            index++;
            pushToStep(Action.IndexPlusPlus);

            pushToStep(Action.BeginForCheckWhile);
        }

        const result = str1.substring(0, index);
        pushToStep(Action.LcpReturnSubstring);
        return result;
    }

    longestCommonPrefix(input);
    return steps;
}
