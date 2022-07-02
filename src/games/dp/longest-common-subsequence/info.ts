import { title } from "./contents";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/longest-common-subsequence",
    categories: [Category.DynamicProgramming],
    companies: [],
    difficulty: Difficulty.Medium,
    img: "/img/longest_common_subsequence.png"
}

export default info;
