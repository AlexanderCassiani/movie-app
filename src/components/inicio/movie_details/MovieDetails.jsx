import './movieDetails.css';
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMovieDetails } from "../../../api/tmdb";
import { Loader } from "../../loader/loader";
import { getVideoTrailer } from "../../../api/tmdb";
import { MovieTrailer } from "./MovieTrailer";

export const MovieDetails = () => {
    const { id } = useParams()
    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [trailerKey, setTrailerKey] = useState(null)
    const [showTrailer, setShowTrailer] = useState(false)

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                setLoading(true)
                setError(null)
                const data = await getMovieDetails(id)
                setMovie(data);
                const trailerData = await getVideoTrailer(id)
                setTrailerKey(trailerData.results.find(video => video.type === 'Trailer' && video.site === 'YouTube')?.key || null)
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

    useEffect(() => {
        console.log('Trailer key cambió:', trailerKey)
    }, [trailerKey])

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
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                    />
                </div>

                <div className="movie-info">
                    <h1>{movie.title}</h1>

                    <div className="movie-meta">
                        <span className="rating">⭐ {movie.vote_average?.toFixed(1)}</span>
                        <span className="release-date">{movie.release_date ? new Date(movie.release_date).getFullYear() : '—'}</span>
                        <span className="runtime">{movie.runtime ? `${movie.runtime} min` : '—'}</span>
                        <span
                            className="trailer-link"
                            onClick={() => setShowTrailer(true)}
                        >Ver trailer
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
        </div>
    )
}