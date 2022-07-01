import { Guiders } from "./algo";
import { Point } from "../_commons/point";

interface NumsTableParams {
    current: Point;
    data: number[];
    success: boolean;
    guiders: Guiders;
}

export default NumsTableParams;
