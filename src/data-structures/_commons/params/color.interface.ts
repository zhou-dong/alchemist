export default interface Color {
    setColor(color: string): Promise<void>;
    get color(): string;
    set color(c: string);
}
