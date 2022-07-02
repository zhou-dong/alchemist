import { title } from "./contents";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/subset-sum-problem",
    categories: [Category.DynamicProgramming],
    companies: [],
    difficulty: Difficulty.Hard,
    img: "/img/subset_sum_problem.png"
}

export default info;
