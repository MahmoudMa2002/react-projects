export default function GenresList(props) {
    const genreListItems = props.genre.map(genre => (
        <li
            key={genre}
            onContextMenu={(e) => {
                e.preventDefault()
                props.deleteGenre(genre)
            }}
            title="Right-click to delete"
        >
            {genre}
        </li>
    ))

    return (
        <section>
            <h2>Desired genres:</h2>
            <p className="hint-text">Right-click to remove genre</p>
            <ul className="genre-list" aria-live="polite">{genreListItems}</ul>
            {props.genre.length > 3 && <div className="get-game-container">
                <div ref={props.ref}>
                    <h3>Ready for a game recommendation?</h3>
                    <p>Find a game that matches your desired genre.</p>
                </div>
                <button onClick={props.getGame}>Find a game</button>
            </div>}
        </section>
    )
}