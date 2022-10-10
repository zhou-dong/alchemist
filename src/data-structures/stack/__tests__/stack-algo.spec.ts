import { StackAlgo as Stack } from '../stack-algo';

test('stack push and pop as FILO', async () => {
  const stack = new Stack<number>();

  await stack.push(10);
  await stack.push(11);
  await stack.push(12);

  await expect(stack.pop()).resolves.toBe(12);
  await expect(stack.pop()).resolves.toBe(11);
  await expect(stack.pop()).resolves.toBe(10);
});

test('stack peek', async () => {
  const stack = new Stack<number>();

  await stack.push(10);
  await expect(stack.peek()).resolves.toBe(10);

  await stack.push(11);
  await expect(stack.peek()).resolves.toBe(11);

  await stack.push(12);
  await expect(stack.peek()).resolves.toBe(12);

  await stack.pop();
  await expect(stack.peek()).resolves.toBe(11);
});

test("stack return it's size after push the new item", async () => {
  const stack = new Stack<number>();

  const size1 = await stack.push(10);
  expect(size1).toBe(1);

  const size2 = await stack.push(17);
  expect(size2).toBe(2);

  const size3 = await stack.push(11);
  expect(size3).toBe(3);
});

test('stack size', async () => {
  const stack = new Stack<number>();

  const promises = [stack.push(1), stack.push(2), stack.push(3)];
  await Promise.all(promises);

  await expect(stack.size()).resolves.toBe(promises.length);

  await stack.pop();
  await expect(stack.size()).resolves.toBe(promises.length - 1);
});

test('stack isEmpty', async () => {
  const stack = new Stack<number>();
  await expect(stack.isEmpty()).resolves.toBeTruthy();

  const pushPromises = [stack.push(1), stack.push(2), stack.push(3)];
  await Promise.all(pushPromises);
  await expect(stack.isEmpty()).resolves.toBeFalsy();

  const popPromises = [stack.pop(), stack.pop(), stack.pop()];
  await Promise.all(popPromises);
  await expect(stack.isEmpty()).resolves.toBeTruthy();
});
