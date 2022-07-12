import { h } from 'preact';
import Player from "./player"

type MatchProps = {
    match: any,
}

const Match = ({match}: MatchProps) => {
    return <div class="flex flex-col border rounded-lg w-96">
        <Player match={match} player="home" />
        <Player match={match} player="away" />
    </div>
}

export default Match;
