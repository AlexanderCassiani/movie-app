const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const isMobile = window.innerWidth <= 767;
export const size = isMobile ? 'w342' : 'w780';

// busqueda de peliculas
export const fetchMovie = async (query) => {
    const response = await fetch(`${BASE_URL}/search/movie?query=${query}&api_key=${API_KEY}`);
    const data = await response.json();
    return data;
};

//peliculas
export const getTopRatedMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
    const data = await response.json();
    return data;
};

export const getTrendingMovies = async () => {
    const response = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
    const data = await response.json();
    return data;
}

export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data;
};

export const getRecentReleases = async () => {
    const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`);
    const data = await response.json();
    return data;
};

export const getUpcomingMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`);
    const data = await response.json();
    return data;
};

export const getMoviesByGenre = async (genreId) => {
    const response = await fetch(`${BASE_URL}/discover/movie?with_genres=${genreId}&api_key=${API_KEY}`);
    const data = await response.json();
    return data;
};

// detalles de peliculas
export const getMovieDetails = async (movieId) => {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
    const data = await response.json();

    if (!response.ok) {
        const msg = data?.status_message || 'Movie not found';
        throw new Error(msg);
    }

    return data;
};

export const getVideoTrailer = async (movieId) => {
    const response = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
    const data = await response.json();
    return data;
};

export const getRecomendedMovies = async (movieId) => {
    const response = await fetch(`${BASE_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}`);
    const data = await response.json();
    return data;
}

// series

export const getPopularSeries = async () => {
    const response = await fetch(
        `${BASE_URL}/tv/popular?api_key=${API_KEY}`
    );

    return await response.json();
};

export const getTopRatedSeries = async () => {
    const response = await fetch(
        `${BASE_URL}/tv/top_rated?api_key=${API_KEY}`
    );

    return await response.json();
};

export const getOnTheAirSeries = async () => {
    const response = await fetch(
        `${BASE_URL}/tv/on_the_air?api_key=${API_KEY}`
    );

    return await response.json();
};

export const getAiringTodaySeries = async () => {
    const response = await fetch(
        `${BASE_URL}/tv/airing_today?api_key=${API_KEY}`
    );

    return await response.json();
};

export const getSeriesByGenre = async (genreId) => {
    const response = await fetch(
        `${BASE_URL}/discover/tv?with_genres=${genreId}&api_key=${API_KEY}`
    );

    return await response.json();
};