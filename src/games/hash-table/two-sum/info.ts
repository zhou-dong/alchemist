import { title } from "./contents";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/two-sum",
    categories: [Category.HashTable],
    companies: [],
    difficulty: Difficulty.Easy,
    img: "/img/two_sum.png"
}

export default info;
