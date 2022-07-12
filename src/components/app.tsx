import { FunctionalComponent, h, createContext } from 'preact';
import { Route, Router } from 'preact-router';
import { useState } from "preact/hooks";
import Home from '../routes/home';
import NotFoundPage from '../routes/notfound';
import Header from './header';
import TournamentMatches from '../routes/tournament';
import Ranking from '../routes/ranking';

const defaultAppContext = {
    spoilers: true,
    setSpoilers: (spoilers: boolean) => {},
}

const App: FunctionalComponent = () => {

    const [spoilers, setSpoilers] = useState(false)
    const appContextValues = {
        spoilers: spoilers,
        setSpoilers: setSpoilers,
    }

    return (
        <div id="preact_root">
            <AppContext.Provider value={appContextValues}>
                <Header />
                <div class="container mx-auto mt-5">
                    <Router>
                        <Route path="/" component={Home} />
                        <Route path="/ranking" component={Ranking} />
                        <Route path="/tournament/:tournament_id" component={TournamentMatches} />
                        <NotFoundPage default />
                    </Router>
                </div>
            </AppContext.Provider>
        </div>
    );
};

export const AppContext = createContext(defaultAppContext)
export default App;