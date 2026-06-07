import './App.css'
import RoutesApp from './routes/routes'
import { Sidebar } from './components/sidebar/Sidebar'
import { Mobile_sidebar } from './components/mobile_sidebar/Mobile_sidebar'

function App() {

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