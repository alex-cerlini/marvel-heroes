import { getMarvelAuthorization } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { HeroesResponse } from '../useHeroes/types'

const fetchHeroById = async (heroId: number): Promise<HeroesResponse> => {
    const { ts, publicApiKey, hash, marvelBaseUrl } = getMarvelAuthorization()

    const response = await fetch(`${marvelBaseUrl}/v1/public/characters/${heroId}?ts=${ts}&apikey=${publicApiKey}&hash=${hash}`)
    const data = await response.json()
    return data
}

const useHeroById = (heroId: number) => {
    return useQuery({
        queryKey: ['heroById', heroId],
        queryFn: () => fetchHeroById(heroId),
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 60 * 24,
    })
}

export { useHeroById, fetchHeroById }
