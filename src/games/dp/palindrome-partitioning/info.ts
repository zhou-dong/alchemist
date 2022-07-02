import { title } from "./contents";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/palindrome-partitioning",
    categories: [Category.DynamicProgramming],
    companies: [],
    difficulty: Difficulty.Hard,
    img: "/img/palindrome_partitioning.png"
}

export default info;
