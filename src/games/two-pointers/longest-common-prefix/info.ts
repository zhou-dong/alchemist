import { title } from "./introduction/Title";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/longest-common-prefix",
    categories: [Category.TwoPointers],
    companies: [],
    difficulty: Difficulty.Easy,
    img: "/img/longest-common-prefix.png",
    leetcodeId: 14
}

export default info;
