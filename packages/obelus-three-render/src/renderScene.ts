// File: /dsl-three-render/src/renderScene.ts
import {
    Object3D,
    Mesh,
    Group,
    Line,
    MeshBasicMaterial,
    LineBasicMaterial,
    BufferGeometry,
    CircleGeometry,
    Vector3
} from 'three';

import { SceneObject, CircleObject, LineObject, GroupObject } from 'obelus';

export type SceneContext = {
    objectMap: Record<string, Object3D>;
};

export type RenderResult = SceneContext & {
    rootObjects: Object3D[];
};

export function renderScene(objects: SceneObject[]): RenderResult {
    const objectMap: Record<string, Object3D> = {};
    const groupedIds = new Set<string>();

    // First pass: create individual objects
    for (const obj of objects) {
        if (obj.type === 'circle') {
            const { center, radius, visual } = (obj as CircleObject).props;
            const geometry = new CircleGeometry(radius, visual?.extra?.segments ?? 32);
            const material = new MeshBasicMaterial({
                color: visual?.color ?? 0xffffff,
                wireframe: visual?.wireframe ?? false,
                ...visual?.materialOptions
            });
            const mesh = new Mesh(geometry, material);
            mesh.position.set(center.x, center.y, center.z);
            objectMap[obj.id] = mesh;
        } else if (obj.type === 'line') {
            const { start, end, color, lineWidth } = (obj as LineObject).props;
            const geometry = new BufferGeometry().setFromPoints([
                new Vector3(start.x, start.y, start.z),
                new Vector3(end.x, end.y, end.z)
            ]);
            const material = new LineBasicMaterial({
                color: color ?? 0xffffff,
                linewidth: lineWidth ?? 1
            });
            const line = new Line(geometry, material);
            objectMap[obj.id] = line;
        }
    }

    // Second pass: assemble groups
    for (const obj of objects) {
        if (obj.type === 'group') {
            const group = new Group();
            for (const childId of (obj as GroupObject).children) {
                const child = objectMap[childId];
                if (child) {
                    group.add(child);
                    groupedIds.add(childId);
                } else {
                    console.warn(`Missing child ${childId} for group ${obj.id}`);
                }
            }
            objectMap[obj.id] = group;
        }
    }

    // Determine root objects
    const rootObjects = objects
        .filter((o) => !groupedIds.has(o.id))
        .map((o) => objectMap[o.id])
        .filter((o): o is Object3D => !!o);

    return { objectMap, rootObjects };
}
