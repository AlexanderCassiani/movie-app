import "./header.css"
import lightMode from "../../../assets/icons/lightMode.svg"
import darkMode from "../../../assets/icons/darkMode.svg"
import logo from "../../../assets/icons/sidebar/logo.svg"
import { useState, useEffect } from "react"

export const Header = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem("isDarkMode");
        return savedMode === null ? true : savedMode === 'true'  
    });

    useEffect(() => {
        document.documentElement.classList.toggle("dark-mode", isDarkMode);
        document.documentElement.classList.toggle("light-mode", !isDarkMode);

        localStorage.setItem("isDarkMode", isDarkMode);
    }, [isDarkMode]);

    return (

        <header>
            <h2>Inicio</h2>

            <div className='header-mobile-logo'>
                <img src={logo} alt="Logo FlixNova" />
                <h1>Flix<span>Nova</span></h1>
            </div>

            <button
                className="mode-toggle"
                title={isDarkMode ? "Modo claro" : "Modo oscuro"}
                onClick={() => setIsDarkMode(!isDarkMode)}
            >
                <img
                    src={isDarkMode ? lightMode : darkMode}
                    alt={isDarkMode ? "Modo claro" : "Modo oscuro"}
                />
            </button>
        </header>
    )
}