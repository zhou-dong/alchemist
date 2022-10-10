import Queue from '../queue-algo';

test('queue enqueue and dequeue as FIFO', async () => {
  const queue = new Queue<number>();

  await queue.enqueue(10);
  await queue.enqueue(11);
  await queue.enqueue(12);

  await expect(queue.dequeue()).resolves.toBe(10);
  await expect(queue.dequeue()).resolves.toBe(11);
  await expect(queue.dequeue()).resolves.toBe(12);
});

test('queue peek', async () => {
  const queue = new Queue<number>();

  await queue.enqueue(10);
  await expect(queue.peek()).resolves.toBe(10);

  await queue.enqueue(11);
  await expect(queue.peek()).resolves.toBe(10);

  await queue.enqueue(12);
  await expect(queue.peek()).resolves.toBe(10);

  await queue.dequeue();
  await expect(queue.peek()).resolves.toBe(11);
});

test("queue return it's size after enqueue the new item", async () => {
  const queue = new Queue<number>();

  const size1 = await queue.enqueue(10);
  expect(size1).toBe(1);

  const size2 = await queue.enqueue(17);
  expect(size2).toBe(2);
});

test('queue size', async () => {
  const queue = new Queue<number>();

  const promises = [queue.enqueue(1), queue.enqueue(2), queue.enqueue(3)];
  await Promise.all(promises);

  await expect(queue.size()).resolves.toBe(promises.length);

  await queue.dequeue();
  await expect(queue.size()).resolves.toBe(promises.length - 1);
});

test('queue isEmpty', async () => {
  const queue = new Queue<number>();
  await expect(queue.isEmpty()).resolves.toBeTruthy();

  const enqueuePromises = [
    queue.enqueue(1),
    queue.enqueue(2),
    queue.enqueue(3),
  ];
  await Promise.all(enqueuePromises);
  await expect(queue.isEmpty()).resolves.toBeFalsy();

  const dequeuePromises = [queue.dequeue(), queue.dequeue(), queue.dequeue()];
  await Promise.all(dequeuePromises);
  await expect(queue.isEmpty()).resolves.toBeTruthy();
});
