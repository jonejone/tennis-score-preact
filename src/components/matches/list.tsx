import {Fragment, FunctionalComponent, h } from 'preact';
import {useEffect, useState, useContext} from "preact/hooks";
import getFlagByCountryName from "../../utils/countries";
import { AppContext } from '../app';


type PlayerScoreProps = {
    match: any,
    player: string,
}

const PlayerScore = ({match, player}: PlayerScoreProps) => {
    let sets: {
        score: number,
        won: boolean,
        tiebreak: boolean,
        tiebreak_points: number | null,
    }[] = [];
    let opponent = player == "home" ? "away" : "home";

    const {spoilers, } = useContext(AppContext)

    for(let x = 1; x <= 5; x++) {

        let set_raw = match.result[`${player}_set${x}`];

        if (typeof set_raw == "undefined" || set_raw == "N/A") {
            break;
        }

        let set = parseInt(set_raw);
        let set_opponent = parseInt(match.result[`${opponent}_set${x}`]);
        let set_won = (set == 6 && set_opponent <= 4) || (set == 7 && (set_opponent == 6 || set_opponent == 5));
        let set_tiebreak = (set == 6 && set_opponent == 7) || (set_opponent == 6 && set == 7);
        
        let set_tiebreak_points = set_tiebreak ? match.result[`${player}_tb${x}`] : null;

        sets.push({
            score: set,
            won: set_won,
            tiebreak: set_tiebreak,
            tiebreak_points: set_tiebreak_points,
        });
    }

    const winner = match.status == "finished" && match.result.winner_id == match[`${player}_id`];

    return (
        <ul class="flex items-stretch text-center">
            {!spoilers && <li class="flex p-4 justify-center text-xl border-l">No spoilers</li>}
            {spoilers && winner && <li class="flex items-center justify-items-center pr-2">
                    <svg class="h-6 w-6 text-gray-500" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 13L9 17L19 7" stroke="#4A5568" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </li>}
            {spoilers && sets && sets.map((set: any, index) => {
                return <li class={"flex items-center justify-items-center p-4 justify-center w-5 text-xl border-l " + (set.won ? "bg-green-300": "")}>
                    {set.score} {set.tiebreak && set.tiebreak_points && <span class="text-xs">{set.tiebreak_points}</span>}
                </li>
            })}
        </ul>

    )
}

type PlayerProps = {
    match: any,
    player: string,
}

const Player = (props: PlayerProps) => {
    const player = props.match[props.player];
    const flag = getFlagByCountryName(player.country);

    return (

            <div class="border border-solid flex justify-between">
                <div class="p-2 flex justify-items-center justify-center items-center">
                    <div class="w-10 pr-2">{flag}</div>
                    <p class="text-l">{player.full_name}</p> 
                </div>
                {props.match.result && <PlayerScore match={props.match} player={props.player} />}
            </div> 

    )
}

type MatchProps = {
    match: any,
}

const Match = ({match}: MatchProps) => {
    return <div class="flex flex-col border rounded-lg w-96">
        <Player match={match} player="home" />
        <Player match={match} player="away" />
    </div>
}

type MatchesListProps = {
    matches: object[],
    title: string,
}

const MatchesList = (props: MatchesListProps) => {
    if (!props.matches.length) {
        return <p>Matches is loading...</p>
    }

    return (
        <div class="max-w-4xl mx-auto my-10">
            {props.title && <h1 class="text-2xl mb-3">{props.title}</h1>}

            <div class="flex flex-wrap justify-start gap-10">
            {props.matches.map((item: object, _: number) => {
                return <Match match={item} />
            })}
            </div>
        </div>
    )
}

export const Matches = (props: any) => {

    const matches = props.matches

    const [notStartedMatches, setNotStartedMatches] = useState([])
    const [startedMatches, setStartedMatches] = useState([])
    const [finishedMatches, setFinishedMatches] = useState([])

    // Updating started, not started and finished when matches is set
    useEffect(() => {
        setNotStartedMatches(matches.filter((match: any) => match.status == "notstarted"))
        setStartedMatches(matches.filter((match: any) => match.status == "inprogress"))
        setFinishedMatches(matches.filter((match: any) => match.status == "finished"))
    }, [matches]);

    return (
        <div>
            {startedMatches.length > 0 && <MatchesList title="Ongoing matches" matches={startedMatches} />}
            {notStartedMatches.length > 0 && <MatchesList title="Not started matches" matches={notStartedMatches} />}
            {finishedMatches.length > 0 && <MatchesList title="Finished matches" matches={finishedMatches} />}
        </div>
    )

};