import './mobile_sidebar.css'
import logo from '../../assets/icons/sidebar/logo.png'
import inicio from '../../assets/icons/sidebar/inicio.png'
import buscar from '../../assets/icons/sidebar/buscar.png'
import peliculas from '../../assets/icons/sidebar/peliculas.png'
import series from '../../assets/icons/sidebar/series.png'
import favoritos from '../../assets/icons/sidebar/favoritos.png'
import { NavLink } from 'react-router-dom'

export const Mobile_sidebar = () => {
    return (
        <div className="mobile-sidebar">
            <nav className="mobile-sidebar-nav">
                <ul className='mobile-sidebar-nav-list'>


                    <li>
                        <NavLink
                            className={({ isActive }) => isActive ? 'btn-link link-active' : 'btn-link'}
                            to="/buscar"
                        >
                            <img src={buscar} alt="Buscar" />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) => isActive ? 'btn-link link-active' : 'btn-link'}
                            to="/peliculas"
                        >
                            <img src={peliculas} alt="Peliculas" />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) => isActive ? 'btn-link link-active' : 'btn-link'}
                            to="/"
                        >
                            <img src={inicio} alt="Inicio" />
                        </NavLink>
                    </li>


                    <li>
                        <NavLink
                            className={({ isActive }) => isActive ? 'btn-link link-active' : 'btn-link'}
                            to="/series"
                        >
                            <img src={series} alt="Series" />
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            className={({ isActive }) => isActive ? 'btn-link link-active' : 'btn-link'}
                            to="/favoritos"
                        >
                            <img src={favoritos} alt="Favoritos" />
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}