import { Fragment, FunctionalComponent, h } from 'preact';
import { Route, Router } from 'preact-router';
import { useEffect, useState } from "preact/hooks";
import { getRanking } from "../../utils/data";
import getFlagByCountryName from "../../utils/countries";



type RankingTableProps = {
    ranking: object[],
}

const RankingTable = ({ranking}: RankingTableProps) => {

    return (
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-s text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th class="w-1/12 px-6 py-3 text-center">Rank</th>
                        <th class="w-1/12 px-6 py-3 text-center">Country</th>
                        <th class="w-9/12 px-6 py-3">Name</th>
                        <th class="w-1/12 px-6 py-3 text-center">Points</th>
                    </tr>
                </thead>
                {ranking && ranking.map((rank: any, _: number) => (
                    <RankingPlayer rank={rank} />
                ))}
            </table>
        </div>
    )
}

type RankingPlayerProps = {
    rank: {
        ranking: string,
        country: string,
        full_name: string,
        ranking_points: string,
    },
}

const RankingPlayer = ({rank}: RankingPlayerProps) => (
    <tr class="odd:bg-white even:bg-slate-50 border-b dark:bg-gray-800 dark:border-gray-700">
        <td class="px-6 py-4 text-2xl text-center">{rank.ranking}</td>
        <td class="px-6 py-4 text-center">{getFlagByCountryName(rank.country)}</td>
        <td class="px-6 py-4 text-xl">{rank.full_name}</td>
        <td class="px-6 py-4 text-center">{rank.ranking_points}</td>
    </tr>
)


const Ranking: FunctionalComponent = () => {

    const [ranking, setRanking] = useState([]);

    useEffect(() => {
        getRanking().then(data => {
            setRanking(data.results.rankings.slice(0, 99))
            console.log(data.results.rankings);
        })
    }, []);

    return (
        <>
            <h1 class="text-3xl mb-5">ATP World Ranking</h1>
            <RankingTable ranking={ranking} />
        </>
    );
};


export default Ranking;
