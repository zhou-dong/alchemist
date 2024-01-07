import { title } from "./description";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/swap-nodes-in-pairs",
    categories: [Category.Recursion, Category.LinkedList],
    companies: [],
    difficulty: Difficulty.Medium,
    img: "/img/swap-nodes-in-pairs.png",
    leetcodeId: 24
}

export default info;
