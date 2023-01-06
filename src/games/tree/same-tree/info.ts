import { title } from "./contents";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/same-tree",
    categories: [Category.Tree],
    companies: [],
    difficulty: Difficulty.Easy,
    img: "/img/same-tree.png",
    leetcodeId: 100
}

export default info;
