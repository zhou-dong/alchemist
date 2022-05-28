import React from "react";
import { Game } from "./game";
import { games as allGames } from "./games";
import { filter } from "./gamesFilter";
import Category from "./segments/category";
import Company from "./segments/company";
import Difficulty from "./segments/difficulty";

const GamesContext = React.createContext<{
    games: Game[],
    categories: Category[],
    companies: Company[],
    difficulties: Difficulty[],
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>,
    setCompanies: React.Dispatch<React.SetStateAction<Company[]>>,
    setDifficulties: React.Dispatch<React.SetStateAction<Difficulty[]>>,
}>({
    games: [],
    categories: [],
    companies: [],
    difficulties: [],
    setCategories: () => { },
    setCompanies: () => { },
    setDifficulties: () => { },
});

export const useGames = () => {
    return React.useContext(GamesContext);
};

export const GamesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [games, setGames] = React.useState<Game[]>(allGames);
    const [categories, setCategories] = React.useState<Category[]>([]);
    const [companies, setCompanies] = React.useState<Company[]>([]);
    const [difficulties, setDifficulties] = React.useState<Difficulty[]>([])

    React.useEffect(
        () => {
            setGames(() => filter(allGames, categories, companies, difficulties))
        },
        [categories, companies, difficulties]
    );

    return (
        <GamesContext.Provider value={{ games, categories, companies, difficulties, setCategories, setCompanies, setDifficulties }}>
            {children}
        </GamesContext.Provider>
    );
};
