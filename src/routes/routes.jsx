import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Loader } from "../components/loader/loader";

const Inicio = lazy(() => import("../pages/inicio/Inicio"))
const Buscar = lazy(() => import("../pages/buscar/Buscar"))
const Peliculas = lazy(() => import("../pages/peliculas/Peliculas"))
const Series = lazy(() => import("../pages/series/Series"))
const Favoritos = lazy(() => import("../pages/favoritos/Favoritos"))

const MovieDetails = lazy(() => import("../components/inicio/movie_details/MovieDetails"))

const RoutesApp = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/buscar" element={<Buscar />} />
                <Route path="/peliculas" element={<Peliculas />} />
                <Route path="/series" element={<Series />} />
                <Route path="/favoritos" element={<Favoritos />} />

                <Route path="/movie/:id" element={<MovieDetails />} />
            </Routes>
        </Suspense>
    )
}

export default RoutesApp;