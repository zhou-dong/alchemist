import { title } from "./contents";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/symmetric-tree",
    categories: [Category.Tree],
    companies: [],
    difficulty: Difficulty.Easy,
    img: "/img/symmetric-tree.png",
    leetcodeId: 101
}

export default info;
