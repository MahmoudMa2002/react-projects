import React from "react"
import GenresList from "./GenresList"
import GameRecommendation from "./GameRecommendation"
import { getGameFromAI } from "../ai"


export default function Main() {
    const [genres, setGenres] = React.useState([])
    const [game, setGame] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const genreSection = React.useRef(null)

    React.useEffect(() => {
        if (game !== "" && genreSection.current !== null) {
            genreSection.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [game])

    async function getGame() {
        setIsLoading(true)
        const gameMarkdown = await getGameFromAI(genres)
        setGame(gameMarkdown)
        setIsLoading(false)
    }

    function addGenre(formData) {
        const newGenre = formData.get("Genre")
        setGenres(prevGenres => [...prevGenres, newGenre])
    }

    function deleteGenre(genreToDelete) {
        setGenres(prevGenres => prevGenres.filter(genre => genre !== genreToDelete))
    }

    return (
        <main>
            <form action={addGenre} className="add-genre-form">
                <input
                    type="text"
                    placeholder="e.g. open world, multiplayer"
                    aria-label="Add game Genre"
                    name="Genre"
                />
                <button>Add Genre</button>
            </form>

            {genres.length > 0 &&
                <GenresList
                    ref={genreSection}
                    genre={genres}
                    getGame={getGame}
                    deleteGenre={deleteGenre}
                />
            }

            {isLoading && (
                <div className="loader-container">
                    <div className="loader"></div>
                    <p>Finding a list of games for you...</p>
                </div>
            )}

            {game && !isLoading && <GameRecommendation game={game} />}
        </main>
    )
}