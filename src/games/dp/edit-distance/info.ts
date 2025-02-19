import { title } from "./contents";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";
import Company from "../../commons/segments/company";

const info: Game = {
    name: title,
    path: "/algorithms/edit-distance",
    categories: [Category.DynamicProgramming],
    companies: [Company.Google],
    difficulty: Difficulty.Hard,
    img: "/img/edit_distance.png",
    leetcodeId: 72,
}

export default info;
