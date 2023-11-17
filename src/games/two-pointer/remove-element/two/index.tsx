import { AlgoContextProvider } from "./AlgoContext";
import Introduction from "./Introduction";
import Play from "./Play";

const Main = () => {
    return (
        <AlgoContextProvider>
            <Introduction />
            <Play />
        </AlgoContextProvider>
    );
}

export default Main;
