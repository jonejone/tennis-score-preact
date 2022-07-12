import {Fragment, FunctionalComponent, h } from 'preact';
import {useEffect, useState, useContext} from "preact/hooks";
import getFlagByCountryName from "../../utils/countries";
import { AppContext } from '../app';

type MatchType = {
    home: {},
    home_id: string,
    away_id: string,
    away: {},
    status: string,
    result: {
        [key: string]: string,
    },
}

type PlayerHomeAwayType = "home" | "away"

type PlayerScoreProps = {
    match: MatchType,
    player: PlayerHomeAwayType,
}

type SetType = {
    score: number,
    won: boolean,
    tiebreak: boolean,
    tiebreak_points: number | null,
}

const PlayerScore = ({match, player}: PlayerScoreProps) => {
    const sets: SetType[] = [];
    const opponent: PlayerHomeAwayType = player == "home" ? "away" : "home";
    const {spoilers, } = useContext(AppContext)

    // Lets iterate for up to 5 sets
    for(let x = 1; x <= 5; x++) {

        // The string result for this set from the API object
        let set_raw = match.result[`${player}_set${x}`];

        // Lets break out if it is undefined or the string "N/A"
        if (typeof set_raw == "undefined" || set_raw == "N/A") {
            break;
        }

        // Get our integer set score from our string
        let set = parseInt(set_raw);

        // The opponent score
        let set_opponent = parseInt(match.result[`${opponent}_set${x}`]);

        // Did our player win this set?
        let set_won = (set == 6 && set_opponent <= 4) || (set == 7 && (set_opponent == 6 || set_opponent == 5));

        // Was there a tiebreak?
        let set_tiebreak = (set == 6 && set_opponent == 7) || (set_opponent == 6 && set == 7);
        
        // If tiebreak, what is the player score for the tiebreak
        let set_tiebreak_points = set_tiebreak ? parseInt(match.result[`${player}_tb${x}`]) : null;

        // Push it into our list of sets played
        sets.push({
            score: set,
            won: set_won,
            tiebreak: set_tiebreak,
            tiebreak_points: set_tiebreak_points,
        });
    }

    // Did our player win the game?
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

export default PlayerScore;