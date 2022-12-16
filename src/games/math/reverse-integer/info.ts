import { title } from "./contents";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/reverse-integer",
    categories: [Category.Math],
    companies: [],
    difficulty: Difficulty.Medium,
    img: "/img/reverse-integer.png",
    leetcodeId: 7
}

export default info;
