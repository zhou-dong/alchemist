import { title } from "./description";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/insertion-sort-list",
    categories: [Category.LinkedList],
    companies: [],
    difficulty: Difficulty.Medium,
    img: "/img/insertion-sort-list.png",
    leetcodeId: 147
}

export default info;
