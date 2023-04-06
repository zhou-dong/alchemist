import { title } from "./contents";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/top-k-frequent-elements",
    categories: [Category.Tree, Category.Heap],
    companies: [],
    difficulty: Difficulty.Medium,
    img: "/img/top-k-frequent-elements.png",
    leetcodeId: 347
}

export default info;
