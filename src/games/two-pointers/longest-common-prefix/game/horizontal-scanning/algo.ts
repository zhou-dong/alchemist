export enum Action {
    Standby,
    CheckIsInputEmpty,
    ReturnEmptyWithEmptyInput,
    DefinePrefix,
    DefineOrCheckForLoop,
    ComputePrefix,
    UpdatePrefix,
    CheckPrefixLength,
    ReturnEmptyWithPrefixEmpty,
    ReturnPrefix,
    BeginLcp,
    DefineIndex,
    CheckWhile,
    IndexPlusPlus,
    ReturnLcp,
}

const getlinesToHighlight = (action: Action): number[] => {
    switch (action) {
        case Action.Standby: return [1];
        case Action.CheckIsInputEmpty: return [2];
        case Action.ReturnEmptyWithEmptyInput: return [3];
        case Action.DefinePrefix: return [6];
        case Action.DefineOrCheckForLoop: return [7];
        case Action.ComputePrefix: return [8];
        case Action.UpdatePrefix: return [8];
        case Action.CheckPrefixLength: return [9];
        case Action.ReturnEmptyWithPrefixEmpty: return [10];
        case Action.ReturnPrefix: return [13];
        case Action.BeginLcp: return [16];
        case Action.DefineIndex: return [17];
        case Action.CheckWhile: return [18, 19, 20, 21, 22];
        case Action.IndexPlusPlus: return [23];
        case Action.ReturnLcp: return [25];
    }
}

export interface Step {
    readonly action: Action;
    readonly linesToHighlight: number[];
    readonly input: string[];
    readonly prefix?: string;
    readonly current?: string;
    readonly index?: number;
}

export const buildSteps = (input: string[]): Step[] => {

    const steps: Step[] = [];

    function pushToStep(action: Action, prefix?: string, current?: string, index?: number) {
        const linesToHighlight: number[] = getlinesToHighlight(action);
        steps.push({ action, linesToHighlight, input, prefix, current, index });
    }

    pushToStep(Action.Standby);
    function longestCommonPrefix(strs: string[]): string {

        pushToStep(Action.CheckIsInputEmpty);
        if (strs.length === 0) {
            pushToStep(Action.ReturnEmptyWithEmptyInput);
            return "";
        }

        let prefix = strs[0];
        pushToStep(Action.DefinePrefix, prefix, strs[0]);

        pushToStep(Action.DefineOrCheckForLoop, prefix, strs[0]);
        for (let i = 1; i < strs.length; i++) {
            pushToStep(Action.ComputePrefix, prefix, strs[i], i);
            prefix = lcp(prefix, strs[i]);
            pushToStep(Action.UpdatePrefix, prefix, strs[i], i);

            pushToStep(Action.CheckPrefixLength, prefix, strs[i], i);
            if (prefix.length === 0) {
                pushToStep(Action.ReturnEmptyWithPrefixEmpty, prefix, strs[i], i);
                return "";
            }
        }

        pushToStep(Action.ReturnPrefix, prefix);
        return prefix;
    }

    function lcp(str1: string, str2: string): string {
        pushToStep(Action.BeginLcp, str1, str2);
        let index = 0;
        pushToStep(Action.DefineIndex, str1, str2, index);

        pushToStep(Action.CheckWhile, str1, str2, index);
        while (
            index < str1.length &&
            index < str2.length &&
            str1.charAt(index) === str2.charAt(index)
        ) {
            index++;
            pushToStep(Action.IndexPlusPlus, str1, str2, index);
            pushToStep(Action.CheckWhile, str1, str2, index);
        }

        const prefix = str1.substring(0, index);
        pushToStep(Action.ReturnLcp, prefix, str2, index);
        return prefix;
    }

    longestCommonPrefix(input);

    return steps;
}; 
