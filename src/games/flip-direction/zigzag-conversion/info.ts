import { title } from "./contents";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/zigzag-conversion",
    categories: [Category.FlipDirection],
    companies: [],
    difficulty: Difficulty.Medium,
    img: "/img/zigzag-conversion.png",
    leetcodeId: 6
}

export default info;
