import { title } from "./contents";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/course-schedule-ii",
    categories: [Category.Graph, Category.TopologicalSort],
    companies: [],
    difficulty: Difficulty.Medium,
    img: "/img/course-schedule-ii.png",
    leetcodeId: 210
}

export default info;
