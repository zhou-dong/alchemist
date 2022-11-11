import { title } from "./contents";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/implement-stack-using-queues",
    categories: [Category.Queue, Category.Stack],
    companies: [],
    difficulty: Difficulty.Easy,
    img: "/img/implement_stack_using_queues.png"
}

export default info;
