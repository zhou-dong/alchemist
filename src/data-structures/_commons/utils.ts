import * as THREE from 'three';

export const wait = (seconds: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
};

export const calDistance = (from: THREE.Vector3, to: THREE.Vector3): THREE.Vector3 => {
  return new THREE.Vector3(to.x - from.x, to.y - from.y, to.z - from.z);
};

export const calDestination = (from: THREE.Vector3, distance: THREE.Vector3): THREE.Vector3 => {
  return new THREE.Vector3(from.x + distance.x, from.y + distance.y, from.z + distance.z);
}
