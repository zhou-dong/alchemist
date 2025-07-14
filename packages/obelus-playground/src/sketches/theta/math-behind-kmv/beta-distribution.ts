const STEP_1 = `
X_{(k)} \\sim \\text{Beta}(k, n - k + 1)
`;

const STEP_2 = `
\\Rightarrow \\quad
X_{(k)} \\sim \\text{Beta}(\\alpha = k, \\beta = n - k + 1)
`;

const STEP_3 = `
\\Rightarrow \\quad
\\mathbb{E}[\\text{Beta}(\\alpha, \\beta)] = \\frac{\\alpha}{\\alpha + \\beta}
`;

const STEP_4 = `
\\Rightarrow \\quad
\\mathbb{E}[X_{(k)}] = \\frac{k}{k + (n - k + 1)}
`;

const STEP_5 = `
\\Rightarrow \\quad
\\mathbb{E}[X_{(k)}] = \\frac{k}{n + 1}
`;

type Step = {
    formula: string;
    height: number;
    x: number;
    // y: number;
}

export const betaDistributionToExpectedKthValueFormulas: Step[] = [
    { formula: STEP_1, height: 25, x: 0 },
    { formula: STEP_2, height: 25, x: 15 },
    { formula: STEP_3, height: 50, x: -33 },
    { formula: STEP_4, height: 50, x: -30 },
    { formula: STEP_5, height: 50, x: -71 },
];
