import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";
import Company from "../../commons/segments/company";

const info: Game = {
    name: "LRU Cache",
    path: "/algorithms/lru-cache",
    categories: [Category.HashTable],
    companies: [Company.Google, Company.Amazone],
    difficulty: Difficulty.Hard,
    img: "/img/lru_cache.png"
}

export default info;
