import './movieDetails.css'
import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { getMovieDetails } from "../../../api/tmdb"
import { Loader } from "../../loader/loader"
import { getVideoTrailer } from "../../../api/tmdb"
import { MovieTrailer } from "./MovieTrailer"
import { getRecomendedMovies } from "../../../api/tmdb"
import { CarruselPeliculas } from "../../../components/inicio/grid_results/CarruselPeliculas"
import no_image from '../../../assets/images/no_image.png'
import { size } from '../../../api/tmdb'
import favoritos from '../../../assets/icons/favoritos.svg'
import agregadoFavoritos from '../../../assets/icons/agregadoFavoritos.svg'

const MovieDetails = () => {
    const { id } = useParams()
    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [trailerKey, setTrailerKey] = useState(null)
    const [showTrailer, setShowTrailer] = useState(false)
    const [recomendedMovies, setRecomendedMovies] = useState([])
    const [isFavorite, setIsFavorite] = useState(() => {
        return localStorage.getItem(`favorito_${id}`) !== null;
    });

    useEffect(() => {
        setIsFavorite(localStorage.getItem(`favorito_${id}`) !== null)
    }, [id])

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                setLoading(true)
                setError(null)

                // Obtener detalles de la película
                const data = await getMovieDetails(id)
                setMovie(data);

                // Obtener trailer
                const trailerData = await getVideoTrailer(id)
                // Buscar el trailer oficial en YouTube
                setTrailerKey(trailerData.results.find(video => video.type === 'Trailer' && video.site === 'YouTube')?.key || null)

                // Obtener películas recomendadas
                const recomendedData = await getRecomendedMovies(id)
                setRecomendedMovies(recomendedData.results || [])
            } catch (err) {
                console.error('Error fetching movie:', err)
                setError(err.message || 'Error al cargar la película')
                setMovie(null)
            } finally {
                setLoading(false)
            }
        };
        if (id) {
            fetchMovie()
        }
    }, [id])

    const toggleFavorite = () => {
        if (!movie) return;

        if (isFavorite) {
            localStorage.removeItem(`favorito_${id}`)
            setIsFavorite(false)
        } else {
            localStorage.setItem(
                `favorito_${id}`,
                JSON.stringify({
                    id: movie.id,
                    title: movie.title,
                    poster_path: movie.poster_path
                })
            )
            setIsFavorite(true)
        }
    }

    if (loading) return <Loader />;

    if (error) return (
        <div className="movie-details-container">
            <div className="movie-error">
                <h2>Error</h2>
                <p>{error}</p>
                <Link to="/" className="btn-back">Volver al inicio</Link>
            </div>
        </div>
    );

    if (!movie) return <div className="movie-details-container"><p>Película no encontrada</p></div>;

    return (
        <div className="movie-details-container">
            <div
                className="movie-backdrop"
                style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})` }}
            >
                <div className="backdrop-overlay"></div>
            </div>

            <div className="movie-content">
                <div className="movie-poster">
                    <img
                        src={movie.poster_path ? `https://image.tmdb.org/t/p/${size}${movie.poster_path} ` : no_image}
                        alt={`Póster de ${movie.title}`}
                    />
                </div>

                <div className="movie-info">
                    <h2>{movie.title}</h2>

                    <div className="movie-meta">
                        <span className="rating">⭐ {movie.vote_average?.toFixed(1)}</span>
                        <span className="release-date">{movie.release_date ? new Date(movie.release_date).getFullYear() : '—'}</span>
                        <span className="runtime">{movie.runtime ? `${movie.runtime} min` : '—'}</span>
                        <span
                            className="trailer-link"
                            onClick={() => setShowTrailer(true)}
                        >Ver trailer
                        </span>
                        <span title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}>
                            <img
                                src={isFavorite ? agregadoFavoritos : favoritos}
                                alt={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                                className="favorite-icon"
                                onClick={toggleFavorite}
                            />
                        </span>
                    </div>

                    {showTrailer && <MovieTrailer videoKey={trailerKey} setShowTrailer={setShowTrailer} />}

                    <div className="genres">
                        {movie.genres?.map(genre => (
                            <span key={genre.id} className="genre-tag">{genre.name}</span>
                        ))}
                    </div>

                    <div className="overview">
                        <h3>Sinopsis</h3>
                        <p>{movie.overview || 'Sin sinopsis disponible.'}</p>
                    </div>

                    {movie.budget > 0 && (
                        <div className="budget-info">
                            <p><strong>Presupuesto:</strong> ${movie.budget.toLocaleString()}</p>
                        </div>
                    )}

                    {movie.revenue > 0 && (
                        <div className="revenue-info">
                            <p><strong>Recaudación:</strong> ${movie.revenue.toLocaleString()}</p>
                        </div>
                    )}
                </div>
            </div>

            {recomendedMovies.length > 0 && (
                <CarruselPeliculas
                    title="Películas que tal vez te gusten"
                    moviesData={recomendedMovies}
                    loading={loading}
                />
            )}
        </div>
    )
}

export default MovieDetails