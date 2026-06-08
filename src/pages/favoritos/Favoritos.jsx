import './favoritos.css'
import '../buscar/buscar.css'
import { useState, useEffect } from 'react'
import { size } from '../../api/tmdb'
import { Link } from 'react-router-dom'

const Favoritos = () => {
    const [favoritos, setFavoritos] = useState([])

    useEffect(() => {
        const movies = []

        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i)

            if (key.startsWith('favorito_')) {
                movies.push(JSON.parse(localStorage.getItem(key)))
            }
        }

        setFavoritos(movies)
    }, [])

    return (
        <div className="favoritos">
            <h2>Favoritos</h2>

            {favoritos.length === 0 ? (
                <p style={{ color: 'rgb(181, 181, 174)' }}>No tienes videos agregados a la lista de favoritos</p>
            ) : (
                <div className="search-results-grid">
                    {favoritos.map(movie => (
                        <Link to={`/movie/${movie.id}`} key={movie.id}>
                            <div className="card-pelicula">
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

export default Favoritos