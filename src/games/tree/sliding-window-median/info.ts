import { title } from "./contents";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/sliding-window-median",
    categories: [Category.Tree, Category.Heap],
    companies: [],
    difficulty: Difficulty.Hard,
    img: "/img/sliding-window-median.png",
    leetcodeId: 480
}

export default info;
