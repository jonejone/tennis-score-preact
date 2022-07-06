
const API_URL = "http://localhost:3000"

export const fetchTournamentMatchesByDate = async (date: string, tournament_id: string) => {

    const url = `${API_URL}/matches-results/1471/${date}`
    const response = await fetch(url)
    const data = await response.json()

    return data
}

export const fetchMatchesByDate = async (date: string) => {

    const url = `${API_URL}/matches-by-date/${date}`
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error("Response from API not OK")
    }

    const data = await response.json()

    return data
}

export const getRanking = async () => {
    const url = `${API_URL}/rankings/ATP`;
    const response = await fetch(url)
    const data = await response.json()
    return data
}