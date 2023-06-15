import { title } from "./contents";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/range-sum-query-mutable",
    categories: [Category.Tree, Category.SegmentTree],
    companies: [],
    difficulty: Difficulty.Medium,
    img: "/img/range-sum-query-mutable.png",
    leetcodeId: 307
}

export default info;
