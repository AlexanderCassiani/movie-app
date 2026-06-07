import './buscar.css'
import { useEffect, useState } from 'react'
import { Header } from '../../components/buscar/header/Header'
import { fetchMovie } from '../../api/tmdb'
import { Loader } from '../../components/loader/loader'
import { Link } from 'react-router-dom'

export const Buscar = () => {
    const [query, setQuery] = useState('')
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const trimmedQuery = query.trim()

        if (!trimmedQuery) {
            setMovies([])
            setError(null)
            setLoading(false)
            return
        }

        const searchMovies = async () => {
            setLoading(true)
            setError(null)
            try {
                const data = await fetchMovie(trimmedQuery)
                setMovies(data.results || [])
            } catch (err) {
                console.error(err)
                setError('No se pudo completar la búsqueda. Intenta de nuevo.')
                setMovies([])
            } finally {
                setLoading(false)
            }
        }

        searchMovies()

    }, [query])

    return (
        <div className="buscar">
            <Header query={query} onQueryChange={setQuery} />

            <div className="search-status">
                {loading && <Loader />}

                {!loading && !query.trim() && <p>Escriba el nombre de una película o serie.</p> }

                {!loading && query.trim() && movies.length === 0 && !error && (
                    <p>No se encontraron resultados para «{query}».</p>
                )}

                {!loading && error && <p className="search-error">{error}</p>}
            </div>

            {!loading && movies.length > 0 && (
                <div className="search-results-grid">
                    {movies.map(movie => (
                        <Link to={`/movie/${movie.id}`}
                            key={movie.id}
                        >
                            <div
                                className="card-pelicula"
                            >
                                <img
                                    className="poster-pelicula"
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    loading="lazy"
                                />

                                <h3>{movie.title}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}
