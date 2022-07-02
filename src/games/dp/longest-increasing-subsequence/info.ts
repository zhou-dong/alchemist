import { title } from "./contents";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/longest-increasing-subsequence",
    categories: [Category.DynamicProgramming],
    companies: [],
    difficulty: Difficulty.Medium,
    img: "/img/longest_increasing_subsequence.png"
}

export default info;
