import { useState } from "react";

export default function Entry(props) {
    const [isFavorite, setIsFavorite] = useState(() => {
        return localStorage.getItem(`favorite-${props.id}`) === 'true';
    });
    const [showModal, setShowModal] = useState(false); 

    const toggleFavorite = () => {
        const newFavorite = !isFavorite;
        setIsFavorite(newFavorite);
        localStorage.setItem(`favorite-${props.id}`, newFavorite);
    };

    return (
        <>
            <article className="journal-entry">
                <div className="main-image-container">
                    <img
                        className="main-image"
                        alt={props.img.alt}
                        src={props.img.src}
                        onClick={() => setShowModal(true)}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
                <div className="info-container">
                    <div className="location-line">
                        <img
                            className="marker"
                            src="/public/marker.png"
                            alt="map marker icon"
                        />
                        <span className="country">{props.country}</span>
                        <button
                            className="favorite-btn"
                            onClick={toggleFavorite}
                            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                        >
                            {isFavorite ? '★' : '☆'}
                        </button>
                    </div>
                    <a href={props.googleMapsLink}>View on Google Maps</a>
                    <h2 className="entry-title">{props.title}</h2>
                    <p className="trip-dates">{props.dates}</p>
                    <p className="entry-text">{props.text}</p>
                </div>
            </article>
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="modal-close"
                            onClick={() => setShowModal(false)}
                        >
                            ×
                        </button>
                        <img
                            src={props.img.src}
                            alt={props.img.alt}
                            className="modal-image"
                        />
                        <p className="modal-caption">{props.title}, {props.country}</p>
                    </div>
                </div>
            )}
        </>
    )
}