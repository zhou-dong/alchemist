


export enum Action {
    Standby,

}

export interface Step {
    linesToHighlight: number[];
}


export const buildSteps = () => {

    function longestCommonPrefix(strs: string[]): string {
        if (strs.length === 0) {
            return "";
        }

        let prefix = strs[0];
        for (let i = 1; i < strs.length; i++) {
            prefix = lcp(prefix, strs[i]);
            if (prefix.length === 0) {
                return "";
            }
        }
        return prefix;
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


}; 
