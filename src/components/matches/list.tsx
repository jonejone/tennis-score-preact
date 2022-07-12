import { h } from 'preact';
import { useEffect, useState } from "preact/hooks";
import Match from "./match";

type MatchesByCategoryListProps = {
    matches: object[],
    title: string,
}

const MatchesByCategoryList = (props: MatchesByCategoryListProps) => {
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

const MatchesList = (props: any) => {

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
            {startedMatches.length > 0 && <MatchesByCategoryList title="Ongoing matches" matches={startedMatches} />}
            {notStartedMatches.length > 0 && <MatchesByCategoryList title="Not started matches" matches={notStartedMatches} />}
            {finishedMatches.length > 0 && <MatchesByCategoryList title="Finished matches" matches={finishedMatches} />}
        </div>
    );
};

export default MatchesList;