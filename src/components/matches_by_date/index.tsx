import { Fragment, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from "preact/hooks";
import { fetchMatchesByDate } from "../../utils/data"
import { DateSelector } from '../date_selector';
import { TournamentMatchesList } from './tournament_list';

import format from 'date-fns/format'


export const MatchesByDate: FunctionalComponent = () => {

    const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'))
    const [matches, setMatches] = useState([])

    // The fetching of matches when date is set
    useEffect(() => {
        fetchMatchesByDate(date).then(data => {
            setMatches(data.results)
        })
    }, [date]);

    return (
        <>
            <h1 class="text-3xl text-center">Matches in all tournaments on {date}</h1>
            <DateSelector date={date} setDate={setDate} />
            <TournamentMatchesList matches={matches} />
        </>
    )
}