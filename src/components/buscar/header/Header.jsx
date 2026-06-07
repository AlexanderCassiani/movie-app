import './header.css'

export const Header = ({ query, onQueryChange }) => {
    return (
        <header>
            <h2>Buscar</h2>
            <input
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                placeholder="Buscar películas, series..."
                aria-label="Buscar películas o series"
            />
        </header>
    )
}