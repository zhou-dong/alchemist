import { type Animatable } from "obelus";
import { type Object3D } from "three";
import * as THREE from "three";

export function render(objects: Animatable<Object3D>[], scene: THREE.Scene): Record<string, Object3D> {

    const record: Record<string, Object3D> = {};

    // add objects to record
    objects
        .filter((o) => o.type === 'object')
        .forEach(({ id, target }) => record[id] = target);

    // assemble groups and add to record
    objects
        .filter((o) => o.type === 'group')
        .forEach(({ id, children }) => {
            const group = new THREE.Group();
            children
                .map((childId) => record[childId])
                .filter(child => !!child)
                .forEach((child) => group.add(child));
            record[id] = group;
        });

    const children: Set<string> = new Set(
        objects
            .filter((o) => o.type === 'group')
            .flatMap((o) => o.children)
    );

    // only add root level objects
    objects
        .filter((o) => !children.has(o.id))
        .map((o) => record[o.id])
        .filter((o): o is Object3D => !!o)
        .map(rootObject => scene.add(rootObject));

    return record;
}
