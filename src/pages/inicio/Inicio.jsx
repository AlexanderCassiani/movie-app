import './inicio.css'
import { Header } from "../../components/inicio/header/Header"
import { CarruselPeliculas } from "../../components/inicio/grid_results/CarruselPeliculas"
import { getPopularMovies, getTrendingMovies, getTopRatedMovies } from "../../api/tmdb"
import { useEffect, useState } from "react"

export const Inicio = () => {

    const [popularMovies, setPopularMovies] = useState([])
    const [trendingMovies, setTrendingMovies] = useState([])
    const [topRatedMovies, setTopRatedMovies] = useState([])

    const [loadingPopular, setLoadingPopular] = useState(true)
    const [loadingTrending, setLoadingTrending] = useState(true)
    const [loadingTopRated, setLoadingTopRated] = useState(true)

    useEffect(() => {
        const loadAllMovies = async () => {
            try {
                const [popular, topRated, trending] = await Promise.all([
                    getPopularMovies(),
                    getTopRatedMovies(),
                    getTrendingMovies()
                ])
                setPopularMovies(popular.results)
                setTopRatedMovies(topRated.results)
                setTrendingMovies(trending.results)
            } catch (error) {
                console.error("Error al cargar las películas:", error)
            } finally {
                setLoadingPopular(false)
                setLoadingTopRated(false)
                setLoadingTrending(false)
            }
        }
        loadAllMovies()
    }, [])

    return (
        <div className="inicio">
            <Header />

            <CarruselPeliculas
                title="Películas Mejor Valoradas"
                moviesData={topRatedMovies}
                loading={loadingTopRated}
            />

            <CarruselPeliculas
                title="Películas Populares"
                moviesData={popularMovies}
                loading={loadingPopular}
            />

            <CarruselPeliculas
                title="Tendencias Ahora"
                moviesData={trendingMovies}
                loading={loadingTrending}
            />
        </div>
    )
}