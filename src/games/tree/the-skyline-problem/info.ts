import { title } from "./contents";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/the-skyline-problem",
    categories: [Category.Tree, Category.Heap],
    companies: [],
    difficulty: Difficulty.Hard,
    img: "/img/the-skyline-problem.png",
    leetcodeId: 218
}

export default info;
