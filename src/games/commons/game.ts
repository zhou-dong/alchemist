import Category from "./segments/category";
import Company from "./segments/company";
import Difficulty from "./segments/difficulty";

export interface Game {
    name: string;
    path: string;
    categories: Category[];
    companies: Company[];
    difficulty: Difficulty;
    img: string;
    leetcodeId?: number;
}
