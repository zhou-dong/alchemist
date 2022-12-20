import { title } from "./_common/contents";
import { Game } from "../../commons/game";
import Category from "../../commons/segments/category";
import Difficulty from "../../commons/segments/difficulty";

const info: Game = {
    name: title,
    path: "/algorithms/integer-to-roman",
    categories: [Category.Math, Category.Greedy],
    companies: [],
    difficulty: Difficulty.Medium,
    img: "/img/integer-to-roman.png",
    leetcodeId: 12
}

export default info;
