import { title } from "./contents";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/roman-to-integer",
    categories: [Category.Math],
    companies: [],
    difficulty: Difficulty.Easy,
    img: "/img/roman-to-integer.png",
    leetcodeId: 13
}

export default info;
