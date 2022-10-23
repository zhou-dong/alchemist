import { title } from "./contents";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/implement-queue-using-stacks",
    categories: [Category.Queue, Category.Stack],
    companies: [],
    difficulty: Difficulty.Easy,
    img: "/img/valid_parentheses.png"
}

export default info;
