import { helperStyle, helperStyleSecondary, helperStyleThird } from '../_commons/styles';
import { Point } from "../_commons/point";

export const addHelperStyles = (styles: React.CSSProperties[][], point: Point, table: (number | string)[][]): void => {
    styles[0][point.col] = helperStyle;
    styles[point.row][0] = helperStyle;
    styles[point.row - 1][point.col] = helperStyleSecondary;
    const coin = Number(table[point.row][0]);
    if (point.col - coin - 1 >= 0) {
        styles[point.row][point.col - coin] = helperStyleThird;
    }
};
