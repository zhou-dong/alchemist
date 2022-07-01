import { Point } from "../_commons/point";
import { Guiders } from "./algo";

export const isSuccess = (value: string, currentPoint: Point, guiders: Guiders): boolean => {
    const { col } = currentPoint;
    const { directions } = guiders;
    return (value.trim() === "--->" && directions[col] === 0) || (value.trim() === "<---" && directions[col] === 1);
};
