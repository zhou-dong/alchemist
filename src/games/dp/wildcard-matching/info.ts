import { title } from "./contents";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/wildcard-matching",
    categories: [Category.DynamicProgramming],
    companies: [],
    difficulty: Difficulty.Hard,
    img: "/img/wildcard_matching.png"
}

export default info;
