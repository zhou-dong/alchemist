import { title } from "./contents";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/dp/minimum-path-sum",
    categories: [Category.DynamicProgramming],
    companies: [],
    difficulty: Difficulty.Easy,
    img: "/img/minimum_path_sum.png"
}

export default info;
