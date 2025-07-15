export const EXPECTED_KTH_ORDER_STATISTIC_LATEX_FORMULA = '\\mathbb{E}[X_{(k)}] \\approx \\frac{k}{n + 1}';
export const KMV_ESTIMATION_LATEX_FORMULA = 'n \\approx \\frac{k}{\\mathbb{E}[X_{(k)}]} - 1';

export const THETA_EXPECTATION_DEFINITION = '\\theta = \\mathbb{E}[X_{(k)}]';

export const THETA_ESTIMATION_LATEX_FORMULA = 'n = \\frac{k}{\\theta} - 1';
export const THETA_EXTIMATION_STEPS_LATEX_FORMULA = `
E = mc^2
`;

const STEP_0 = `
\\mathbb{E}[X_{(k)}] = \\frac{k}{n + 1}

\\mathbb{E}[X_{(k)}] = \\theta
`;

const STEP_1 = `
\\quad \\Rightarrow \\quad
\\theta = \\frac{k}{n + 1}
`;

const STEP_2 = `
\\quad \\Rightarrow \\quad
\\theta \\cdot \\left( n + 1 \\right) = \\frac{k}{n + 1}  \\cdot \\left( n + 1 \\right) 
`;

const STEP_3 = `
\\quad \\Rightarrow \\quad
\\theta \\cdot \\left( n + 1 \\right) = k
`;

const STEP_4 = `
\\quad \\Rightarrow \\quad
\\theta \\cdot \\left( n + 1 \\right) \\cdot \\frac{1}{\\theta} = k \\cdot \\frac{1}{\\theta}
`;

const STEP_5 = `
\\quad \\Rightarrow \\quad
n + 1 = \\frac{k}{\\theta}
`;

const STEP_6 = `
\\quad \\Rightarrow \\quad
n + 1 - 1= \\frac{k}{\\theta} - 1

`;
const STEP_7 = `
\\quad \\Rightarrow \\quad
n = \\frac{k}{\\theta} - 1
`;

export const INFER_THETA_STEPS = [
    STEP_0,
    STEP_1, STEP_2, STEP_3, STEP_4, STEP_5, STEP_6, STEP_7
];
