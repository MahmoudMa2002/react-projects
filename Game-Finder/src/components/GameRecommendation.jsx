import ReactMarkdown from "react-markdown"

export default function GameRecommendation(props) {
    return (
        <section className="game-recommendation-container" aria-live="polite">
            <ReactMarkdown>{props.game}</ReactMarkdown>
        </section>
    )
}