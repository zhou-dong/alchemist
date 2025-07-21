const ORRDER_STATISTICS_FORMULA = `
\\mathbb{E}[X_{(k)}] = \\frac{k}{n + 1}
`;

const THETA_DEFINITION = `
\\mathbb{E}[X_{(k)}] = \\theta
`;

const THETA_EQUATION = `
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

const KMV_FORMULA = `
\\Rightarrow \\quad
n = \\frac{k}{\\theta} - 1
`;

export const ORDER_STATISTICS_TO_KMV_FORMULAS = [
    ORRDER_STATISTICS_FORMULA,
    THETA_DEFINITION,
    THETA_EQUATION,
    STEP_4,
    STEP_5,
    STEP_6,
    STEP_7,
    STEP_8,
    KMV_FORMULA,
];
