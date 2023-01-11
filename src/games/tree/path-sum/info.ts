import { title } from "./contents";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/path-sum",
    categories: [Category.Tree],
    companies: [],
    difficulty: Difficulty.Easy,
    img: "/img/path-sum.png",
    leetcodeId: 112
}

export default info;
