import { title } from "./contents";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/first-bad-version",
    categories: [Category.BinarySearch],
    companies: [],
    difficulty: Difficulty.Easy,
    img: "/img/first-bad-version.png",
    leetcodeId: 278
}

export default info;
