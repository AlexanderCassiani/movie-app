import './series.css'
import { useEffect, useState } from 'react'
import { CarruselPeliculas } from '../../components/inicio/grid_results/CarruselPeliculas'

import { getPopularSeries, getTopRatedSeries, getOnTheAirSeries, getAiringTodaySeries, getSeriesByGenre } from '../../api/tmdb'

const GENEROS_SERIES = [
    { name: 'Acción y aventura', id: 10759 },
    { name: 'Animación', id: 16 },
    { name: 'Comedia', id: 35 },
    { name: 'Crimen', id: 80 },
    { name: 'Drama', id: 18 },
    { name: 'Documental', id: 99 },
    { name: 'Familiar', id: 10751 },
    { name: 'Misterio', id: 9648 },
    { name: 'Ciencia ficción y fantasía', id: 10765 }
]

const Series = () => {
    const [popularSeries, setPopularSeries] = useState([])
    const [topRatedSeries, setTopRatedSeries] = useState([])
    const [onTheAirSeries, setOnTheAirSeries] = useState([])
    const [airingTodaySeries, setAiringTodaySeries] = useState([])

    const [loadingPopular, setLoadingPopular] = useState(true)
    const [loadingTopRated, setLoadingTopRated] = useState(true)
    const [loadingOnTheAir, setLoadingOnTheAir] = useState(true)
    const [loadingAiringToday, setLoadingAiringToday] = useState(true)

    const [genres, setGenres] = useState(
        GENEROS_SERIES.map((genre) => ({
            ...genre,
            series: [],
            loading: true
        }))
    )

    useEffect(() => {
        loadSeries()
    }, [])

    const loadSeries = async () => {
        try {
            const [popularResponse, topRatedResponse, onTheAirResponse, airingTodayResponse, genreResponses] = await Promise.all([
                getPopularSeries(),
                getTopRatedSeries(),
                getOnTheAirSeries(),
                getAiringTodaySeries(),
                Promise.all(
                    GENEROS_SERIES.map((genre) =>
                        getSeriesByGenre(genre.id)
                    )
                )
            ])

            setPopularSeries(popularResponse.results || [])
            setTopRatedSeries(topRatedResponse.results || [])
            setOnTheAirSeries(onTheAirResponse.results || [])
            setAiringTodaySeries(airingTodayResponse.results || [])

            setLoadingPopular(false)
            setLoadingTopRated(false)
            setLoadingOnTheAir(false)
            setLoadingAiringToday(false)

            const genresWithSeries = GENEROS_SERIES.map((genre, index) => ({
                ...genre,
                series: genreResponses[index]?.results || [],
                loading: false
            }))

            setGenres(genresWithSeries)

        } catch (error) {
            console.error('Error cargando series:', error)

            setLoadingPopular(false)
            setLoadingTopRated(false)
            setLoadingOnTheAir(false)
            setLoadingAiringToday(false)

            setGenres((currentGenres) =>
                currentGenres.map((genre) => ({
                    ...genre,
                    loading: false
                }))
            )
        }
    }

    return (
        <div className="series">
            <h2>Series</h2>

            <div>
                <CarruselPeliculas
                title="Populares"
                moviesData={popularSeries.slice(0, 12)}
                loading={loadingPopular}
            />
            </div>

            <div>
                <CarruselPeliculas
                title="Mejor valoradas"
                moviesData={topRatedSeries.slice(0, 12)}
                loading={loadingTopRated}
            />
            </div>

            <div>
                <CarruselPeliculas
                title="En emisión"
                moviesData={onTheAirSeries.slice(0, 12)}
                loading={loadingOnTheAir}
            />
            </div>

            <div>
                <CarruselPeliculas
                title="Estrenan hoy"
                moviesData={airingTodaySeries.slice(0, 12)}
                loading={loadingAiringToday}
            />
            </div>

            {genres.map((genre) => (
                <div key={genre.id}>
                    <CarruselPeliculas
                    title={genre.name}
                    moviesData={genre.series.slice(0, 12)}
                    loading={genre.loading}
                />
                </div>
            ))}
        </div>
    )
}

export default Series