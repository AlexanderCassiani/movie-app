import './carrusel.css'
import { useRef } from "react";
import arrowLeft from '../../../assets/icons/arrowLeft.svg'
import arrowRight from '../../../assets/icons/arrowRight.svg'
import noImage from '../../../assets/images/no_image.png'
import { Loader } from "../../loader/loader"
import { Link } from 'react-router-dom';

export const CarruselPeliculas = ({ title, moviesData, loading }) => {

    const sliderRef = useRef(null)

    // Función para realizar un desplazamiento suave al hacer clic en las flechas
    const smoothScroll = (distance) => {
        const slider = sliderRef.current;

        const start = slider.scrollLeft;
        const duration = 400;
        let startTime = null;

        const animate = (time) => {
            if (!startTime) startTime = time;

            const progress = Math.min((time - startTime) / duration, 1);

            slider.scrollLeft =
                start + distance * (1 - Math.pow(1 - progress, 3));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    };

    const scrollLeft = () => smoothScroll(-240);
    const scrollRight = () => smoothScroll(240);

    return (
        <div className="contenedor-pelicula">

            {loading ? <Loader /> : (
                <>
                    <button
                        className="btn-left"
                        onClick={scrollLeft}
                    >
                        <img src={arrowLeft} alt="Flecha izquierda" />
                    </button>

                    <h2>{title}</h2>

                    <article className="flex-contenedor" ref={sliderRef}>
                        {moviesData.map(movie => (
                            <Link to={`/movie/${movie.id}`}
                                key={movie.id}
                            >
                                <div
                                    className="card-pelicula"
                                >
                                    <img
                                        className="poster-pelicula"
                                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : noImage}
                                        alt={movie.title || 'Imagen no disponible'}
                                        loading="lazy"
                                    />

                                    <h3>{movie.title}</h3>
                                </div>
                            </Link>
                        ))}
                    </article>
                    <button
                        className="btn-right"
                        onClick={scrollRight}
                    >
                        <img src={arrowRight} alt="Flecha derecha" />
                    </button>
                </>
            )}

        </div>
    )
}