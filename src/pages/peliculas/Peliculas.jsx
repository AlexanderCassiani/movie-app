import './peliculas.css'
import { useEffect, useState } from 'react'
import { CarruselPeliculas } from '../../components/inicio/grid_results/CarruselPeliculas'
import { getMoviesByGenre } from '../../api/tmdb'

const GENEROS = [
    { name: 'Acción', id: 28 }, 
    { name: 'Aventura', id: 12 }, 
    { name: 'Animación', id: 16 }, 
    { name: 'Comedia', id: 35 }, 
    { name: 'Crimen', id: 80 }, 
    { name: 'Documental', id: 99 }, 
    { name: 'Drama', id: 18 }, 
    { name: 'Familiar', id: 10751 }, 
    { name: 'Fantasía', id: 14 }, 
    { name: 'Historia', id: 36 }, 
    { name: 'Terror', id: 27 }, 
    { name: 'Música', id: 10402 }, 
    { name: 'Misterio', id: 9648 }, 
    { name: 'Romance', id: 10749 }, 
    { name: 'Ciencia ficción', id: 878 }, 
    { name: 'TV Movie', id: 10770 }, 
    { name: 'Thriller', id: 53 }, 
    { name: 'Bélica', id: 10752 }, 
    { name: 'Western', id: 37 }
]

const Peliculas = () => {
    const [genres, setGenres] = useState(
        GENEROS.map((genre) => ({
            ...genre,
            movies: [],
            loading: true
        }))
    )

    useEffect(() => {
        loadGenresMovies()
    }, [])

    const loadGenresMovies = async () => {
        try {
            const moviesResponses = await Promise.all(
                GENEROS.map((genre) => getMoviesByGenre(genre.id))
            )

            const genresWithMovies = GENEROS.map((genre, index) => ({
                ...genre,
                movies: moviesResponses[index]?.results || [],
                loading: false
            }))

            setGenres(genresWithMovies)

        } catch (error) {
            console.error('Error cargando géneros:', error)

            setGenres((currentGenres) =>
                currentGenres.map((genre) => ({
                    ...genre,
                    loading: false
                }))
            )
        }
    }

    return (
        <div className="peliculas">
            <header className="peliculas-header">
                <h2>Películas por género</h2>
            </header>

            {genres.map((genre) => (
                <CarruselPeliculas
                    key={genre.id}
                    title={genre.name}
                    moviesData={genre.movies}
                    loading={genre.loading}
                />
            ))}
        </div>
    )
}

export default Peliculas