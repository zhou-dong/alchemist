import Position from './params/position.interface';

export const wait = (seconds: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
};

export const calDistance = (from: Position, to: Position): Position => {
  return { x: to.x - from.x, y: to.y - from.y, z: to.z - from.z };
};

export const calDestination = (from: Position, distance: Position): Position => {
  return { x: from.x + distance.x, y: from.y + distance.y, z: from.z + distance.z };
}
