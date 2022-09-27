import * as React from 'react';



// private buildStackShell() {
//     const shell = new StackAlgo<Cube>();
//     const { material, position, size } = this.shellParams;
//     const { width, height, depth } = this.nodeSize;
//     const { x, y, z } = position;
//     for (let i = 0; i < size; i++) {
//         const geometry = new THREE.BoxGeometry(width, height, depth)
//         const cube = new Cube(geometry, material, this.scene);
//         cube.x = x - width * i;
//         cube.y = y;
//         cube.z = z;
//         cube.show();
//         shell.push(cube);
//     }
// }

export default function Algo() {


    return (
        <div style={{ width: "100%", textAlign: "center", position: "fixed", bottom: "100px" }}>
            empty implementation of algo
        </div>
    )

}
