export interface Step {
    readonly linesToHighlight: number[];
}

export const buildSteps = (input: string[]): Step[] => {

    const steps: Step[] = [];

    function longestCommonPrefix(strs: string[]): string {
        if (strs.length === 0) {
            return "";
        }

        let prefix = "";
        for (let i = 0; i < strs[0].length; i++) {
            for (let j = 0; j < strs.length; j++) {
                if (strs[0].charAt(i) !== strs[j].charAt(i)) {
                    return prefix;
                }
            }
            prefix += strs[0].charAt(i);
        }
        return prefix;
    };

    return steps;
}
