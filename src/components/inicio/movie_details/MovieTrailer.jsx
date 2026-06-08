import './movieTrailer.css';

export const MovieTrailer = ({ videoKey, setShowTrailer }) => {
    if (!videoKey) {
        return (
            <div className="trailer-overlay" onClick={() => setShowTrailer(false)}>
                <div className="video-not-found">
                    No hay tráiler disponible
                </div>
            </div>
        );
    }

    return (
        <div
            className='trailer-overlay'
            onClick={() => setShowTrailer(false)}
        >
            <div className='video-container'>
                <iframe
                    src={`https://www.youtube.com/embed/${videoKey}`}
                    title="Trailer"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        </div>
    );
}; 