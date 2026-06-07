import './carrusel.css'
import { useRef } from "react";
import arrowLeft from '../../../assets/icons/arrowLeft.svg'
import arrowRight from '../../../assets/icons/arrowRight.svg'
import { Loader } from "../../loader/loader"
import { Link } from 'react-router-dom';

export const CarruselPeliculas = ({ title, moviesData, loading }) => {

    const sliderRef = useRef(null)

    // Función para realizar un desplazamiento suave al hacer clic en las flechas
    const smoothScroll = (targetLeft) => {
        const slider = sliderRef.current;
        const startLeft = slider.scrollLeft;
        const distance = targetLeft - startLeft;
        const duration = 500;
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            slider.scrollLeft = startLeft + distance * easeProgress;

            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    };

    const scrollLeft = () => {
        const slider = sliderRef.current;
        smoothScroll(slider.scrollLeft - 190);
    };

    const scrollRight = () => {
        const slider = sliderRef.current;
        smoothScroll(slider.scrollLeft + 190);
    };

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
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
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