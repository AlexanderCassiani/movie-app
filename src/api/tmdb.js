const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '9c8fe51814f95fde7d7bb25c3a65b700';

export const fetchMovie = async (query) => {
    const response = await fetch(`${BASE_URL}/search/movie?query=${query}&api_key=${API_KEY}`);
    const data = await response.json();
    return data;
};

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