import { title } from "./contents";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/longest-substring-without-repeating-characters",
    categories: [Category.SlidingWindow, Category.HashTable],
    companies: [],
    difficulty: Difficulty.Medium,
    img: "/img/longest-substring-without-repeating-characters.png"
}

export default info;
