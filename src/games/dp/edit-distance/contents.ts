export const title = 'Edit Distance';

export const formula = `
if (char1 === char2) {
    table[row][col] = table[row - 1][col - 1];
} else {
    const min = Math.min(
        table[row - 1][col - 1],
        table[row - 1][col],
        table[row][col - 1]
    );
    table[row][col] = min + 1;
}`;

export const code = `public int minDistance(String word1, String word2) {

    int rows = word1.length() + 1;
    int cols = word2.length() + 1;

    int table[][] = new int[rows][cols];

    for (int col = 1; col < cols; col++) {
        table[0][col] = col;
    }

    for (int row = 1; row < rows; row++) {
        table[row][0] = row;
    }

    for (int row = 1; row < rows; row++) {
        for (int col = 1; col < cols; col++) {
            if (word1.charAt(row - 1) == word2.charAt(col - 1)) {
                table[row][col] = table[row - 1][col - 1];
            } else {
                table[row][col] = min(table[row - 1][col - 1], table[row - 1][col], table[row][col - 1]) + 1;
            }
        }
    }

    return table[rows - 1][cols - 1];
}

private int min(int a, int b, int c) {
    return Math.min(a, Math.min(b, c));
}`;

export const description = `
In computational linguistics and computer science, edit distance is a 
way of quantifying how dissimilar two strings (e.g., words) are to 
one another by counting the minimum number of operations required to 
transform one string into the other.

\\- From Wikipedia.
`;

export const usecases = `
1. In natural language processing, where automatic spelling 
correction can determine candidate corrections for a misspelled 
word by selecting words from a dictionary that have a low distance 
to the word in question. 
2. In bioinformatics, it can be used to quantify the similarity 
of DNA sequences, which can be viewed as strings of the letters 
A, C, G and T.

\\- From Wikipedia.
`;

export const example = `
The distance between kitten and sitting is 3. 
A minimal edit script that transforms the former into the latter is: 

1. kitten → sitten (substitution of 's' for 'k') 
2. sitten → sittin (substitution of 'i' for 'e') 
3. sittin → sitting (insertion of 'g' at the end).

\\-From Wikipedia.
`;
