import { title } from "./contents";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/number-of-provinces",
    categories: [Category.Graph],
    companies: [],
    difficulty: Difficulty.Medium,
    img: "/img/number-of-provinces.png",
    leetcodeId: 547
}

export default info;
