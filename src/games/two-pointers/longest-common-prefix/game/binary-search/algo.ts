export enum Action {
    Standby,
    CheckIsInputEmpty,
    ReturnEmptyWithEmptyInput,
    CalculateMinLength,
    DefineLowAndHigh,
    CheckWhileCondition,
    CalculateMid,
    BeginIsCommonPrefix,
    ResultIsCommonPrefix,
    UpdateLowToMid,
    UpdateHighToMidMinus1,
    ReturnLongestCommonPrefix,
    ReadyIsCommonPrefix,
    CheckOuterForLoop,
    CheckInnerForLoop,
    Compare2Chars,
    IsCommonPrefixReturnFalse,
    IsCommonPrefixReturnTrue,
}

const getlinesToHighlight = (action: Action): number[] => {
    switch (action) {
        case Action.Standby: return [1];
        case Action.CheckIsInputEmpty: return [2];
        case Action.ReturnEmptyWithEmptyInput: return [3];
        case Action.CalculateMinLength: return [6, 7, 8, 9];
        case Action.DefineLowAndHigh: return [11];
        case Action.CheckWhileCondition: return [12];
        case Action.CalculateMid: return [13];
        case Action.BeginIsCommonPrefix: return [14];
        case Action.ResultIsCommonPrefix: return [14];
        case Action.UpdateLowToMid: return [15];
        case Action.UpdateHighToMidMinus1: return [17];
        case Action.ReturnLongestCommonPrefix: return [21];
        case Action.ReadyIsCommonPrefix: return [24];
        case Action.CheckOuterForLoop: return [25];
        case Action.CheckInnerForLoop: return [26];
        case Action.Compare2Chars: return [27];
        case Action.IsCommonPrefixReturnFalse: return [28];
        case Action.IsCommonPrefixReturnTrue: return [32];
    }
}

export interface Step {
    readonly action: Action;
    readonly linesToHighlight: number[];
    readonly input: string[];
    readonly minLength?: number;
    readonly low?: number;
    readonly high?: number;
    readonly mid?: number;
    readonly isCommonPrefix?: boolean;
    readonly length?: number;
    readonly i?: number;
    readonly j?: number;
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

        const minLength = strs.reduce(
            (accumulator, current) => Math.min(accumulator, current.length),
            strs[0].length
        );
        pushToStep({ ...baseStep, action: Action.CalculateMinLength, minLength });

        let low = 0, high = minLength;
        pushToStep({ ...baseStep, action: Action.DefineLowAndHigh, minLength, low, high });

        pushToStep({ ...baseStep, action: Action.CheckWhileCondition, minLength, low, high });
        while (low < high) {
            const mid = low + Math.floor((high - low + 1) / 2);
            pushToStep({ ...baseStep, action: Action.CalculateMid, minLength, low, high, mid });

            pushToStep({ ...baseStep, action: Action.BeginIsCommonPrefix, minLength, low, high, mid });
            const isPrefix = isCommonPrefix(strs, mid);
            pushToStep({ ...baseStep, action: Action.ResultIsCommonPrefix, minLength, low, high, mid, isCommonPrefix: isPrefix });
            if (isPrefix) {
                low = mid;
                pushToStep({ ...baseStep, action: Action.UpdateLowToMid, minLength, low, high, mid, isCommonPrefix: isPrefix });
            } else {
                high = mid - 1;
                pushToStep({ ...baseStep, action: Action.UpdateHighToMidMinus1, minLength, low, high, mid, isCommonPrefix: isPrefix });
            }
        }

        pushToStep({ ...baseStep, action: Action.ReturnLongestCommonPrefix, minLength, low, high });
        return strs[0].substring(0, low);
    }

    function isCommonPrefix(strs: string[], length: number): boolean {
        pushToStep({ ...baseStep, action: Action.ReadyIsCommonPrefix, length });

        pushToStep({ ...baseStep, action: Action.CheckOuterForLoop, length });
        for (let i = 1; i < strs.length; i++) {
            pushToStep({ ...baseStep, action: Action.CheckInnerForLoop, length, i });
            for (let j = 0; j < length; j++) {
                pushToStep({ ...baseStep, action: Action.Compare2Chars, length, i, j });
                if (strs[0].charAt(j) !== strs[i].charAt(j)) {
                    pushToStep({ ...baseStep, action: Action.IsCommonPrefixReturnFalse, length, i, j });
                    return false;
                }
                pushToStep({ ...baseStep, action: Action.CheckInnerForLoop, length, i });
            }
            pushToStep({ ...baseStep, action: Action.CheckOuterForLoop, length, i });
        }

        pushToStep({ ...baseStep, action: Action.IsCommonPrefixReturnTrue, length, });
        return true;
    }

    longestCommonPrefix(input);
    return steps;
}
