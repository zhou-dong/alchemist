import { type Animatable } from "obelus";
import { type Object3D } from "three";
import * as THREE from "three";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
import { DualScene } from "./dual";

export function render(objects: Animatable<Object3D | CSS3DObject>[], scene: DualScene): Record<string, Object3D | CSS3DObject> {

    const record: Record<string, Object3D | CSS3DObject> = {};

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
                .filter((child) => child instanceof THREE.Object3D)
                .forEach((child) => group.add(child));
            record[id] = group;
        });

    const children: Set<string> = new Set(
        objects
            .filter((o) => o.type === 'group')
            .flatMap((o) => o.children)
            .filter((childId) => {
                const child = record[childId];
                return child instanceof THREE.Object3D;
            })
    );

    // only add root level objects
    objects
        .filter((o) => !children.has(o.id))
        .map((o) => record[o.id])
        .filter((o): o is Object3D => !!o)
        .forEach(rootObject => {
            if (rootObject instanceof CSS3DObject) {
                scene.css3dScene.add(rootObject);
            } else {
                scene.threeScene.add(rootObject);
            }
        });

    return record;
}
