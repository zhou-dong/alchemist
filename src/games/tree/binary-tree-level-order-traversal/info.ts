import { title } from "./contents";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/binary-tree-level-order-traversal",
    categories: [Category.Tree, Category.Queue],
    companies: [],
    difficulty: Difficulty.Medium,
    img: "/img/binary-tree-level-order-traversal.png",
    leetcodeId: 102
}

export default info;
