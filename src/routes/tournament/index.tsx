import {Fragment, FunctionalComponent, h } from 'preact';
import {useEffect, useState} from "preact/hooks";
import getFlagByCountryName from "../../utils/countries";
import { fetchTournamentMatchesByDate } from "../../utils/data"
import { DateSelector } from '../../components/date_selector';
import { Matches } from '../../components/matches/list';
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

const MatchesTest = ({tournament_id}: any) => {

    const [tournament, setTournament] = useState(null)
    const [matches, setMatches] = useState([])
    const [notStartedMatches, setNotStartedMatches] = useState([])
    const [startedMatches, setStartedMatches] = useState([])
    const [finishedMatches, setFinishedMatches] = useState([])
    const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'))

    // The fetching of matches when date is set
    useEffect(() => {
        fetchTournamentMatchesByDate(date, tournament_id)
            .then(data => {
                setTournament(data.results.tournament)
                setMatches(data.results.matches)
            })
            .catch(err => {
                console.error('Unable to fetch matches!')
            })
    }, [date]);

    // Updating started, not started and finished when matches is set
    useEffect(() => {
        setNotStartedMatches(matches.filter((match: any) => match.status == "notstarted"))
        setStartedMatches(matches.filter((match: any) => match.status == "inprogress"))
        setFinishedMatches(matches.filter((match: any) => match.status == "finished"))
    }, [matches]);

    return (
        <div>
            <TournamentHeader date={date} tournament={tournament} />
            <DateSelector date={date} setDate={setDate} />

            {startedMatches.length > 0 && <Matches title="Ongoing matches" matches={startedMatches} />}
            {notStartedMatches.length > 0 && <Matches title="Not started matches" matches={notStartedMatches} />}
            {finishedMatches.length > 0 && <Matches title="Finished matches" matches={finishedMatches} />}
            
        </div>
    )

};

const Tournament: FunctionalComponent = ({tournament_id}: any) => {

    console.log("Tournament ID", tournament_id)

    return (
        <div>
            <MatchesTest tournament_id={tournament_id} />
        </div>
    );
};

export default Tournament;
