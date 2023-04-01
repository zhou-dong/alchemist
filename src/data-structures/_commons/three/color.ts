import IColor from "../params/color";

export default class Color implements IColor {

    private material: THREE.Material;

    constructor(material: THREE.Material) {
        this.material = material;
    }

    setColor(color: string): Promise<void> {
        return (this.material as any).color.set(color);
    }

    get color(): string {
        return (this.material as any).color.getHexString();
    }

}
