import { title } from "./contents";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/merge-k-sorted-lists",
    categories: [Category.Tree, Category.Heap],
    companies: [],
    difficulty: Difficulty.Hard,
    img: "/img/merge-k-sorted-lists.png",
    leetcodeId: 23
}

export default info;
