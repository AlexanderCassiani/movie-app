import './inicio.css'
import { Header } from "../../components/inicio/header/Header"
import { CarruselPeliculas } from "../../components/inicio/grid_results/CarruselPeliculas"
import { getPopularMovies, getTrendingMovies, getTopRatedMovies, getRecentReleases, getUpcomingMovies } from "../../api/tmdb"
import { useEffect, useState } from "react"

export const Inicio = () => {

    const [popularMovies, setPopularMovies] = useState([])
    const [trendingMovies, setTrendingMovies] = useState([])
    const [topRatedMovies, setTopRatedMovies] = useState([])
    const [recentReleases, setRecentReleases] = useState([])
    const [upcomingMovies, setUpcomingMovies] = useState([])

    const [loadingPopular, setLoadingPopular] = useState(true)
    const [loadingTrending, setLoadingTrending] = useState(true)
    const [loadingTopRated, setLoadingTopRated] = useState(true)
    const [loadingRecent, setLoadingRecent] = useState(true)
    const [loadingUpcoming, setLoadingUpcoming] = useState(true)
    

    useEffect(() => {
        const loadAllMovies = async () => {
            try {
                const [popular, topRated, trending, recent, upcoming] = await Promise.all([
                    getPopularMovies(),
                    getTopRatedMovies(),
                    getTrendingMovies(),
                    getRecentReleases(),
                    getUpcomingMovies()
                ])
                setPopularMovies(popular.results)
                setTopRatedMovies(topRated.results)
                setTrendingMovies(trending.results)
                setRecentReleases(recent.results)
                setUpcomingMovies(upcoming.results)
            } catch (error) {
                console.error("Error al cargar las películas:", error)
            } finally {
                setLoadingPopular(false)
                setLoadingTopRated(false)
                setLoadingRecent(false)
                setLoadingTrending(false)
                setLoadingUpcoming(false)
            }
        }
        loadAllMovies()
    }, [])

    return (
        <div className="inicio">
            <Header />

            <CarruselPeliculas
                title="Películas mejor valoradas"
                moviesData={topRatedMovies}
                loading={loadingTopRated}
            />

            <CarruselPeliculas
                title="Películas populares"
                moviesData={popularMovies}
                loading={loadingPopular}
            />

            <CarruselPeliculas
                title="Tendencias ahora"
                moviesData={trendingMovies}
                loading={loadingTrending}
            />

            <CarruselPeliculas
                title="Lanzamientos recientes"
                moviesData={recentReleases}
                loading={loadingRecent}
            />

            <CarruselPeliculas
                title="Próximos estrenos"
                moviesData={upcomingMovies}
                loading={loadingUpcoming}
            />

            <p className="search-info">Puedes buscar más películas en el apartado de buscar.</p>
        </div>
    )
}