import { type Animatable } from "obelus";
import { type Object3D } from "three";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
import { DualScene } from "./dual";

export function render(objects: Animatable<Object3D | CSS3DObject>[], scene: DualScene): Record<string, Object3D | CSS3DObject> {

    const record: Record<string, Object3D | CSS3DObject> = {};

    objects.forEach(({ id, target }) => {
        if (target instanceof CSS3DObject) {
            scene.css3dScene.add(target);
        } else {
            scene.threeScene.add(target);
        }
        record[id] = target;
    });

    return record;
}
