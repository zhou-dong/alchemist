import { Guiders } from "./algo";
import { Point } from "../../dp/_commons/point";

interface NumsTableParams {
    current: Point;
    data: number[];
    success: boolean;
    guiders: Guiders;
}

export default NumsTableParams;
