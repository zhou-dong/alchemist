import { title } from "./contents";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/surrounded-regions",
    categories: [Category.Graph],
    companies: [],
    difficulty: Difficulty.Medium,
    img: "/img/surrounded-regions.png",
    leetcodeId: 130
}

export default info;
