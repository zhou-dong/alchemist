import { title } from "./contents";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/valid-parentheses",
    categories: [Category.Stack],
    companies: [],
    difficulty: Difficulty.Easy,
    img: "/img/valid-parentheses.png"
}

export default info;
