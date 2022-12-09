import { title } from "./contents";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/palindrome-number",
    categories: [Category.Math],
    companies: [],
    difficulty: Difficulty.Easy,
    img: "/img/palindrome-number.png",
    leetcodeId: 9
}

export default info;
