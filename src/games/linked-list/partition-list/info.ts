import { title } from "./description";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/partition-list",
    categories: [Category.LinkedList],
    companies: [],
    difficulty: Difficulty.Medium,
    img: "/img/partition-list.png",
    leetcodeId: 86
}

export default info;
