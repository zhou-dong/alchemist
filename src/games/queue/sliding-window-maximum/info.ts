import { title } from "./contents";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/sliding-window-maximum",
    categories: [Category.Queue, Category.Deque],
    companies: [],
    difficulty: Difficulty.Hard,
    img: "/img/sliding-window-maximum.png",
    leetcodeId: 239
}

export default info;
