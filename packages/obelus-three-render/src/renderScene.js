"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderScene = renderScene;
const three_1 = require("three");
function buildThreeCircle(circleObject) {
    const { center, radius, visual } = circleObject;
    const geometry = new three_1.CircleGeometry(radius, ...visual === null || visual === void 0 ? void 0 : visual.geometry);
    const material = new three_1.MeshBasicMaterial(Object.assign({}, visual === null || visual === void 0 ? void 0 : visual.material));
    const mesh = new three_1.Mesh(geometry, material);
    const { x, y, z } = center;
    mesh.position.set(x, y, z);
    return mesh;
}
;
function buildThreeLine(lineObject) {
    const { start, end, visual } = lineObject;
    const geometry = new three_1.BufferGeometry().setFromPoints([
        new three_1.Vector3(start.x, start.y, start.z),
        new three_1.Vector3(end.x, end.y, end.z)
    ]);
    const material = new three_1.LineBasicMaterial(Object.assign({}, visual === null || visual === void 0 ? void 0 : visual.material));
    return new three_1.Line(geometry, material);
}
;
function renderScene(objects) {
    const objectMap = {};
    const groupedIds = new Set();
    // First pass: create individual objects
    for (const obj of objects) {
        switch (obj.type) {
            case 'circle':
                objectMap[obj.id] = buildThreeCircle(obj);
                break;
            case 'line':
                objectMap[obj.id] = buildThreeLine(obj);
                break;
        }
    }
    // Second pass: assemble groups
    for (const obj of objects) {
        if (obj.type === 'group') {
            const group = new three_1.Group();
            for (const childId of obj.children) {
                const child = objectMap[childId];
                if (child) {
                    group.add(child);
                    groupedIds.add(childId);
                }
                else {
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
        .filter((o) => !!o);
    return { objectMap, rootObjects };
}
