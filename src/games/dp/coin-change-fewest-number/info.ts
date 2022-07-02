import { title } from "./contents";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/coin-change",
    categories: [Category.DynamicProgramming],
    companies: [],
    difficulty: Difficulty.Medium,
    img: "/img/coin_change_fewest_number.png"
}

export default info;
