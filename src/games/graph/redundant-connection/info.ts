import { title } from "./contents";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/redundant-connection",
    categories: [Category.Graph, Category.UnionFind],
    companies: [],
    difficulty: Difficulty.Medium,
    img: "/img/redundant-connection.png",
    leetcodeId: 684
}

export default info;
