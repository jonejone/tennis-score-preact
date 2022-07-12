import { FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router/match';
import { AppContext } from '../app';
import { useContext} from "preact/hooks";


const Header: FunctionalComponent = () => {

    const {spoilers, setSpoilers} = useContext(AppContext)

    return (
        <header class="bg-gray-800 text-gray-300">
            <nav class="container mx-auto py-5">
                <ol class="flex gap-5 items-center">
                    <li class="text-2xl mr-5">Awesome Tennis App</li>
                    <li>
                        <Link class="hover:bg-gray-700 text-white px-3 py-2 text-sm font-medium rounded-md" activeClassName="bg-gray-900" href="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link class="hover:bg-gray-700 text-white px-3 py-2 text-sm font-medium rounded-md" activeClassName="bg-gray-900" href="/tournament/1471">
                            Wimbledon Matches
                        </Link>
                    </li>
                    <li>
                        <Link class="hover:bg-gray-700 text-white px-3 py-2 text-sm font-medium rounded-md" activeClassName="bg-gray-900" href="/ranking">
                            ATP Rankings
                        </Link>
                    </li>
                    <li>
                        Show spoilers?
                        &nbsp;
                        <input type="checkbox" onClick={() => setSpoilers(!spoilers)} checked={spoilers} />
                    </li>
                </ol>
            </nav>
        </header>
    );
};

export default Header;