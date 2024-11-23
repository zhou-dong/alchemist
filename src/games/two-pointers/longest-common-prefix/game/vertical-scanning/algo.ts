export enum Action {
    Standby,
    CheckIsInputEmpty,
    ReturnEmptyBecauseEmptyInput,
    DefinePrefix,
    DefineOrCheckOutterForLoop,
    DefineOrCheckInnerForLoop,
    CompareTwoChars,
    ReturnPrefixInForLoop,
    AppendToPrefix,
    ReturnPrefix,
}

const getlinesToHighlight = (action: Action): number[] => {
    switch (action) {
        case Action.Standby: return [1];
        case Action.CheckIsInputEmpty: return [2];
        case Action.ReturnEmptyBecauseEmptyInput: return [3];
        case Action.DefinePrefix: return [6];
        case Action.DefineOrCheckOutterForLoop: return [7];
        case Action.DefineOrCheckInnerForLoop: return [8];
        case Action.CompareTwoChars: return [9];
        case Action.ReturnPrefixInForLoop: return [10];
        case Action.ReturnPrefix: return [13];
        case Action.AppendToPrefix: return [13];
        case Action.ReturnPrefix: return [15];
    }
}

export interface Step {
    readonly action: Action;
    readonly linesToHighlight: number[];
    readonly input: string[];
    readonly prefix?: string;
    readonly stringIndex?: number;
    readonly charIndex?: number;
}

export const buildSteps = (input: string[]): Step[] => {

    const steps: Step[] = [];

    function pushToStep(action: Action, prefix?: string, stringIndex?: number, charIndex?: number) {
        const linesToHighlight: number[] = getlinesToHighlight(action);
        steps.push({ action, linesToHighlight, input, prefix, stringIndex, charIndex });
    }

    pushToStep(Action.Standby);
    function longestCommonPrefix(strs: string[]): string {

        pushToStep(Action.CheckIsInputEmpty);
        if (strs.length === 0) {
            pushToStep(Action.ReturnEmptyBecauseEmptyInput);
            return "";
        }

        pushToStep(Action.DefinePrefix);
        let prefix = "";

        pushToStep(Action.DefineOrCheckOutterForLoop, prefix);
        for (let i = 0; i < strs[0].length; i++) {
            pushToStep(Action.DefineOrCheckInnerForLoop, prefix, i);
            for (let j = 0; j < strs.length; j++) {
                pushToStep(Action.CompareTwoChars, prefix, i, j);
                if (strs[0].charAt(i) !== strs[j].charAt(i)) {
                    pushToStep(Action.ReturnPrefixInForLoop, prefix, i, j);
                    return prefix;
                }
                pushToStep(Action.DefineOrCheckInnerForLoop, prefix, i, j);
            }

            prefix += strs[0].charAt(i);
            pushToStep(Action.AppendToPrefix, prefix, i);

            pushToStep(Action.DefineOrCheckOutterForLoop, prefix, i);
        }

        pushToStep(Action.ReturnPrefix, prefix);
        return prefix;
    };

    longestCommonPrefix(input);

    return steps;
}
