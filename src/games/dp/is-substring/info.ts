import { title } from "./contents";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/is-substring",
    categories: [Category.DynamicProgramming],
    companies: [],
    difficulty: Difficulty.Easy,
    img: "/img/is_substring.png"
}

export default info;
