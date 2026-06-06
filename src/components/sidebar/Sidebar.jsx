import './sidebar.css'
import logo from '../../assets/icons/sidebar/logo.png'
import inicio from '../../assets/icons/sidebar/inicio.png'
import buscar from '../../assets/icons/sidebar/buscar.png'
import peliculas from '../../assets/icons/sidebar/peliculas.png'
import series from '../../assets/icons/sidebar/series.png'
import favoritos from '../../assets/icons/sidebar/favoritos.png'
import { NavLink } from 'react-router-dom'

export const Sidebar = () => {
    return (
        <div className="sidebar">
            <div>
                <img src={logo} alt="Logo CineFlix" />
                <h1>Cine<span>Flix</span></h1>
            </div>

            <nav className="sidebar-nav">
                <ul className='sidebar-nav-list'>
                    <li>
                        <NavLink
                            className={({ isActive }) => isActive ? 'btn-link link-active' : 'btn-link'}
                            to="/"
                        >
                            <img src={inicio} alt="Inicio" />
                            Inicio
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            className={({ isActive }) => isActive ? 'btn-link link-active' : 'btn-link'}
                            to="/buscar"
                        >
                            <img src={buscar} alt="Buscar" />
                            Buscar
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            className={({ isActive }) => isActive ? 'btn-link link-active' : 'btn-link'}
                            to="/peliculas"
                        >
                            <img src={peliculas} alt="Peliculas" />
                            Peliculas
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            className={({ isActive }) => isActive ? 'btn-link link-active' : 'btn-link'}
                            to="/series"
                        >
                            <img src={series} alt="Series" />
                            Series
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            className={({ isActive }) => isActive ? 'btn-link link-active' : 'btn-link'}
                            to="/favoritos"
                        >
                            <img src={favoritos} alt="Favoritos" />
                            Favoritos
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}