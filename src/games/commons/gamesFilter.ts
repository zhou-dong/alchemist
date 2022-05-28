import { Game } from "./game";
import Category from "./segments/category";
import Company from "./segments/company";
import Difficulty from "./segments/difficulty";

export const filter = (
    games: Game[],
    categories: Category[],
    companies: Company[],
    difficulties: Difficulty[],
): Game[] => {
    if (categories.length === 0 && companies.length === 0 && difficulties.length === 0) {
        return games;
    }

    const filteredOne = filterCategory(games, categories);
    const filteredTwo = filterCompany(games, companies);
    const filteredThree = filterDifficulty(games, difficulties);

    return intersect(intersect(filteredOne, filteredTwo), filteredThree);
}

const intersect = <T>(arrayOne: T[], arrayTwo: T[]): T[] => {
    return arrayOne.filter(x => arrayTwo.includes(x));
}

const filterCategory = (games: Game[], categories: Category[]): Game[] => {
    if (categories.length === 0) {
        return games;
    } else {
        return games.filter(game => intersect(categories, game.categories).length > 0);
    }
}

const filterCompany = (games: Game[], companies: Company[]): Game[] => {
    if (companies.length === 0) {
        return games;
    } else {
        return games.filter(game => intersect(companies, game.companies).length > 0);
    }
}

const filterDifficulty = (games: Game[], difficulties: Difficulty[]): Game[] => {
    if (difficulties.length === 0) {
        return games;
    } else {
        return games.filter(game => intersect(difficulties, game.difficulties).length > 0);
    }
}
