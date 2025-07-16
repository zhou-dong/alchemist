const STEP_1 = `
\\mathbb{E}[X_{(k)}] = \\frac{k}{n + 1} \\quad \\quad \\text{Order Statistics}
`;

const STEP_2 = `
\\mathbb{E}[X_{(k)}] = \\theta \\quad \\quad \\quad \\quad \\quad \\text{Theta}
`;

const STEP_3 = `
\\Rightarrow \\quad
\\theta = \\frac{k}{n + 1}
`;

const STEP_4 = `
\\Rightarrow \\quad
\\theta \\cdot \\left( n + 1 \\right) = \\frac{k}{n + 1}  \\cdot \\left( n + 1 \\right) 
`;

const STEP_5 = `
\\Rightarrow \\quad
\\theta \\cdot \\left( n + 1 \\right) = k
`;

const STEP_6 = `
\\Rightarrow \\quad
\\theta \\cdot \\left( n + 1 \\right) \\cdot \\frac{1}{\\theta} = k \\cdot \\frac{1}{\\theta}
`;

const STEP_7 = `
\\Rightarrow \\quad
n + 1 = \\frac{k}{\\theta}
`;

const STEP_8 = `
\\Rightarrow \\quad
n + 1 - 1= \\frac{k}{\\theta} - 1

`;
const STEP_9 = `
\\Rightarrow \\quad
n = \\frac{k}{\\theta} - 1
`;

type Step = {
    formula: string;
    height: number;
}

export const orderStatisticsToKmvFormulas: Step[] = [
    { formula: STEP_1, height: 50 },
    { formula: STEP_2, height: 25 },
    { formula: STEP_3, height: 50 },
    { formula: STEP_4, height: 50 },
    { formula: STEP_5, height: 25 },
    { formula: STEP_6, height: 50 },
    { formula: STEP_7, height: 50 },
    { formula: STEP_8, height: 50 },
    { formula: STEP_9, height: 50 },
];
