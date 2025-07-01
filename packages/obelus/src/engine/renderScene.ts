import { Scene } from '../dsl/scene';
import { Object3D, Group, Mesh, MeshBasicMaterial, CircleGeometry, LineBasicMaterial, BufferGeometry, Line, Vector3 } from 'three';
import { CircleObject, GroupObject, LineObject } from '../types/objects';

function createThreeCircle({ center, radius, visual }: CircleObject) {
    const { x, y, z } = center;
    const geometry = new CircleGeometry(radius, 32);
    const material = new MeshBasicMaterial({ ...visual });
    const mesh = new Mesh(geometry, material);
    mesh.position.set(x, y, z);
    return mesh;
}

function createThreeLine({ start, end, visual }: LineObject) {
    const points: Vector3[] = [];
    points.push(new Vector3(start.x, start.y, start.z));
    points.push(new Vector3(end.x, end.y, end.z));

    const geometry = new BufferGeometry().setFromPoints(points);
    const material = new LineBasicMaterial({ ...visual });
    return new Line(geometry, material);
}

export type RenderResult = {
    objectMap: Record<string, Object3D>;
    rootObjects: Object3D[];
};

export function renderScene(scene: Scene): RenderResult {
    const objectMap: Record<string, Object3D> = {};

    // First pass: create all base objects
    for (const obj of scene.objects) {
        if (obj.type === 'circle') {
            objectMap[obj.id] = createThreeCircle(obj as CircleObject);
        } else if (obj.type === 'line') {
            objectMap[obj.id] = createThreeLine(obj as LineObject);
        }
    }

    // Second pass: assemble groups
    for (const obj of scene.objects) {
        if (obj.type === 'group') {
            const group = new Group();
            for (const childId of obj.children) {
                const child = objectMap[childId];
                if (child) {
                    group.add(child);
                } else {
                    console.warn(`Group '${obj.id}' child '${childId}' not found.`);
                }
            }
            objectMap[obj.id] = group;
        }
    }

    // Collect top-level objects (those not included in any group)
    const groupedIds: Set<string> = new Set(
        scene
            .objects
            .filter(({ type }) => type === 'group')
            .map(o => o as GroupObject)
            .flatMap(g => g.children)
    );

    const rootObjects: Object3D[] = scene
        .objects
        .filter(({ id }) => !groupedIds.has(id))
        .map(({ id }) => objectMap[id])
        .filter((o): o is Object3D => !!o);

    return { objectMap, rootObjects };
}
