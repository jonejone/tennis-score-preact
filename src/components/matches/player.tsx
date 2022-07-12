import {Fragment, FunctionalComponent, h } from 'preact';
import PlayerScore from "./player_score"
import getFlagByCountryName from "../../utils/countries";

type PlayerProps = {
    match: any,
    player: "home" | "away",
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

export default Player;