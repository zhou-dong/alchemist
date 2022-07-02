import { title } from "./contents";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/regular-expression",
    categories: [Category.DynamicProgramming],
    companies: [],
    difficulty: Difficulty.Hard,
    img: "/img/regular_expression.png"
}

export default info;
