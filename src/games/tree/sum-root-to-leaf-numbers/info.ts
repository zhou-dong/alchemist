import { title } from "./contents";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/sum-root-to-leaf-numbers",
    categories: [Category.Tree],
    companies: [],
    difficulty: Difficulty.Medium,
    img: "/img/sum-root-to-leaf-numbers.png",
    leetcodeId: 129
}

export default info;
