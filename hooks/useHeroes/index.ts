import { getMarvelAuthorization } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { HeroesResponse } from './types'

const fetchHeroes = async (page = 1): Promise<HeroesResponse> => {
    const { ts, publicApiKey, hash, marvelBaseUrl } = getMarvelAuthorization()

    const offset = (page - 1) * 20

    const response = await fetch(`${marvelBaseUrl}/v1/public/characters?ts=${ts}&apikey=${publicApiKey}&hash=${hash}&orderBy=name&limit=20&offset=${offset}`)
    const data = await response.json()
    return data
}

const useHeroes = (page: number) => {
    return useQuery({
        queryKey: ['heroes', page],
        queryFn: () => fetchHeroes(page),
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 60 * 24,
    })
}

export { useHeroes, fetchHeroes }
