import { title } from "./contents";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/top-k-frequent-words",
    categories: [Category.Tree, Category.Heap],
    companies: [],
    difficulty: Difficulty.Medium,
    img: "/img/top-k-frequent-words.png",
    leetcodeId: 692
}

export default info;
