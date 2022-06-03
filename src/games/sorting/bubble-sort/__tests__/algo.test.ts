import * as THREE from "three";
import Container from "../../commons/container";
import { sort } from "../algo";

test("BubbleSort", () => {
    const fakePosition = new THREE.Vector3(0, 0, 0);
    const arrays: Container[] = [];
    arrays.push({ position: fakePosition, payload: 5 });
    arrays.push({ position: fakePosition, payload: 2 });
    arrays.push({ position: fakePosition, payload: 1 });
    arrays.push({ position: fakePosition, payload: 4 });
    arrays.push({ position: fakePosition, payload: 3 });
    arrays.push({ position: fakePosition, payload: 7 });
    arrays.push({ position: fakePosition, payload: 6 });
    arrays.push({ position: fakePosition, payload: 8 });
    arrays.push({ position: fakePosition, payload: 9 });
    arrays.push({ position: fakePosition, payload: 0 });
    arrays.push({ position: fakePosition, payload: 6 });

    sort(arrays);
    for (let i = 0; i < arrays.length - 1; i++) {
        const a = arrays[i];
        const b = arrays[i + 1];
        expect(a.payload).toBeLessThanOrEqual(b.payload);
    }
});
