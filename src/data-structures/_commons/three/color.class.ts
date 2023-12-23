import IColor from "../params/color.interface";

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

    set color(c: string) {
        (this.material as any).color.set(c);
    }

}
