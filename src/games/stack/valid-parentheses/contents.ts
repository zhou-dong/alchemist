export const title = "Valid Parentheses";

export const formula = `
static Set<Character> set = new HashSet<>(Arrays.asList(new Character[] { '(', '[', '{' }));;
static Map<Character, Character> map = new HashMap<>();

static {
    map.put(')', '(');
    map.put(']', '[');
    map.put('}', '{');
}

public boolean isValid(String s) {
    Stack<Character> stack = new Stack<>();
    for (char c : s.toCharArray()) {
        if (set.contains(c)) {
            stack.add(c);
        } else if (stack.isEmpty() || stack.pop() != map.get(c)) {
            return false;
        }
    }
    return stack.size() == 0;
}
`;

export const description = `
Given a string containing '(', ')', '{', '}', '[' and ']', check whether if it is valid.

The brackets must close in the correct order.
`;

export const usecases = '';

export const example = `
Example 1:

- Input: s = "()"
- Output: true

Example 2:

- Input: s = "()[]{}"
- Output: true

Example 3:

- Input: s = "(]"
- Output: false
`;
