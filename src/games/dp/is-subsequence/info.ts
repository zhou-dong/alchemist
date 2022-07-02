import { title } from "./contents";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/is-subsequence",
    categories: [Category.DynamicProgramming],
    companies: [],
    difficulty: Difficulty.Easy,
    img: "/img/is_subsequence.png"
}

export default info;
