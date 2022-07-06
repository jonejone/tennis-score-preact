import { Fragment, FunctionalComponent, h } from 'preact';
import { fetchMatchesByDate } from "../../utils/data"
import { DateSelector } from '../date_selector';
import { useEffect, useState } from "preact/hooks";
import { Link } from 'preact-router/match';
import { Matches } from '../matches/list';


const TournamentMatchesItem = (props: any) => {

    const tournament = props.tournament.tournament
    const matches = props.tournament.matches

    return (
        <div class="border border-solid p-10 mb-5">
            <h1 class="text-2xl">
                <Link href={`/tournament/${tournament.id}`} class="hover:underline">
                    {tournament.name}
                </Link>
            </h1>
            <Matches matches={matches} />
        </div>
    )
}

interface TournamentMatchesProps {
    matches: object[],
}

export const TournamentMatchesList = ({matches}: TournamentMatchesProps) => {
    return (
        <>
        {matches.map((tournament, index) => (
            <TournamentMatchesItem tournament={tournament} />
        ))}
        </>
    )
}