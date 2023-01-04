import { title } from "./contents";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/balanced-binary-tree",
    categories: [Category.Tree],
    companies: [],
    difficulty: Difficulty.Easy,
    img: "/img/balanced-binary-tree.png",
    leetcodeId: 110
}

export default info;
