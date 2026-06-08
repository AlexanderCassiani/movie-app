import './buscar.css'
import { useEffect, useState } from 'react'
import { Header } from '../../components/buscar/header/Header'
import { fetchMovie } from '../../api/tmdb'
import noImage from '../../assets/images/no_image.png'
import { Loader } from '../../components/loader/loader'
import { Link } from 'react-router-dom'
import { size } from '../../api/tmdb'

const Buscar = () => {
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

                {!loading && !query.trim() && <p style={{ color: '#b5b5ae' }}>Escriba el nombre de una película o serie.</p> }

                {!loading && query.trim() && movies.length === 0 && !error && (
                    <p style={{ color: 'rgb(181, 181, 174)' }}>No se encontraron resultados para «{query}».</p>
                )}

                {!loading && error && <p className="search-error">{error}</p>}
            </div>

            {!loading && movies.length > 0 && (
                <div className="search-results-grid">
                    {movies.slice(0, 12).map(movie => (
                        <Link to={`/movie/${movie.id}`}
                            key={movie.id}
                        >
                            <div
                                className="card-pelicula"
                            >
                                <img
                                    className="poster-pelicula"
                                    src={movie.poster_path ? `https://image.tmdb.org/t/p/${size}${movie.poster_path}` : noImage}
                                    alt={movie.title || 'Imagen no disponible'}
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

export default Buscar