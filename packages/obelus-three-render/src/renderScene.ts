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

import { SceneObject, CircleObject, LineObject, GroupObject } from '../../obelus';

function buildThreeCircle(circleObject: CircleObject) {
    const { center, radius, visual } = circleObject;
    const geometry = new CircleGeometry(radius, ...visual?.geometry);
    const material = new MeshBasicMaterial({ ...visual?.material });
    const mesh = new Mesh(geometry, material);
    const { x, y, z } = center;
    mesh.position.set(x, y, z);
    return mesh;
};

function buildThreeLine(lineObject: LineObject) {
    const { start, end, visual } = lineObject;
    const geometry = new BufferGeometry().setFromPoints([
        new Vector3(start.x, start.y, start.z),
        new Vector3(end.x, end.y, end.z)
    ]);
    const material = new LineBasicMaterial({ ...visual?.material });
    return new Line(geometry, material);
};

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
        switch (obj.type) {
            case 'circle':
                objectMap[obj.id] = buildThreeCircle(obj as CircleObject);
                break;
            case 'line':
                objectMap[obj.id] = buildThreeLine(obj as LineObject);
                break;
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
