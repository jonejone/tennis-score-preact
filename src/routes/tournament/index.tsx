import {Fragment, FunctionalComponent, h } from 'preact';
import {useEffect, useState} from "preact/hooks";
import getFlagByCountryName from "../../utils/countries";
import { fetchTournamentMatchesByDate } from "../../utils/data"
import { DateSelector } from '../../components/date_selector';
import MatchesList from '../../components/matches/list';
import Loading from '../../components/loading';
import format from 'date-fns/format'

type TournamentHeaderProps = {
    tournament: any,
    date: string,
}

const TournamentHeader = ({tournament, date}: TournamentHeaderProps) => {
    return (
        <>
        {tournament && <h1 class="text-3xl text-center">{tournament.name} matches on {date}</h1>}
        {!tournament && <h1 class="text-3xl text-center">Tournament is loading...</h1>}
        </>
    )
}

const TournamentMatches = ({tournament_id}: any) => {

    const [tournament, setTournament] = useState(null)
    const [matches, setMatches] = useState([])
    const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'))
    const [loadingMatches, setLoadingMatches] = useState(true)

    // The fetching of matches when date is set
    useEffect(() => {

        setLoadingMatches(true)

        fetchTournamentMatchesByDate(date, tournament_id)
            .then(data => {
                setTournament(data.results.tournament)
                setMatches(data.results.matches)
                setLoadingMatches(false)
            })
            .catch(err => {
                console.error('Unable to fetch matches!')
                setLoadingMatches(false)
            })
    }, [date]);

    return (
        <div>
            <TournamentHeader date={date} tournament={tournament} />
            <DateSelector date={date} setDate={setDate} />
            <MatchesList matches={matches} />
            <Loading loading={loadingMatches} />
        </div>
    )
};

export default TournamentMatches;