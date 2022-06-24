import { title } from "./contents";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";
import Company from "../../commons/segments/company";

const info: Game = {
    name: title,
    path: "/dp/edit-distance",
    categories: [Category.DynamicProgramming],
    companies: [Company.Google],
    difficulty: Difficulty.Hard,
}

export default info;
