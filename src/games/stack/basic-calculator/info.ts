import { title } from "./contents";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/basic-calculator",
    categories: [Category.Stack],
    companies: [],
    difficulty: Difficulty.Hard,
    img: "/img/basic-calculator.png"
}

export default info;
