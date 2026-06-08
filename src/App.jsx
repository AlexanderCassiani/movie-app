import './App.css'
import RoutesApp from './routes/routes'
import { Sidebar } from './components/sidebar/Sidebar'
import { Mobile_sidebar } from './components/mobile_sidebar/Mobile_sidebar'
import { useEffect } from 'react'

function App() {

    useEffect(() => {
        const savedMode = localStorage.getItem("isDarkMode");
        const isDarkMode = savedMode === null ? true : savedMode === 'true';
        document.documentElement.classList.toggle('dark-mode', isDarkMode);
        document.documentElement.classList.toggle('light-mode', !isDarkMode);
    }, []);

    return (
        <>
            <div className="app">
                <Sidebar />
                <main className="app-main">
                    <RoutesApp />
                </main>
                <Mobile_sidebar />
            </div>
        </>
    )
}

export default App