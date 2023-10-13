import { title } from "./description";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/plus-one",
    categories: [Category.Math],
    companies: [],
    difficulty: Difficulty.Easy,
    img: "/img/plus-one.png",
    leetcodeId: 66
}

export default info;
