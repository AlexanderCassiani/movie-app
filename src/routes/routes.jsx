import { Routes, Route } from "react-router-dom";
import { Inicio } from "../pages/inicio/Inicio";
import { Buscar } from "../pages/buscar/Buscar";
import { Peliculas } from "../pages/peliculas/Peliculas";
import { Series } from "../pages/series/Series";
import { Favoritos } from "../pages/favoritos/Favoritos";

import { MovieDetails } from "../components/inicio/movie_details/MovieDetails";

const RoutesApp = () => {
    return (
        <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/buscar" element={<Buscar />} />
            <Route path="/peliculas" element={<Peliculas />} />
            <Route path="/series" element={<Series />} />
            <Route path="/favoritos" element={<Favoritos />} />

            <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
    )
}

export default RoutesApp;