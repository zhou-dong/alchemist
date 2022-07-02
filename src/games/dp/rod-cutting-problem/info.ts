import { title } from "./contents";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/rod-cutting-problem",
    categories: [Category.DynamicProgramming],
    companies: [],
    difficulty: Difficulty.Hard,
    img: "/img/rod_cutting_problem.png"
}

export default info;
