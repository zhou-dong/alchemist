import { title } from "./contents";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/house-robber",
    categories: [Category.DynamicProgramming],
    companies: [],
    difficulty: Difficulty.Medium,
    img: "/img/house_robber.png"
}

export default info;
