import Header from "./components/Header"
import Entry from "./components/Entry"
import mapData from "./data.js"

export default function App() {
    const sortedData = [...mapData].sort((a, b) => {
        const aFav = localStorage.getItem(`favorite-${a.id}`) === 'true';
        const bFav = localStorage.getItem(`favorite-${b.id}`) === 'true';
        return bFav - aFav;
    });

    const mapElement = sortedData.map((area) => {
        return <Entry
            key={area.id}
            {...area}
        />
    })

    return (
        <>
            <Header />
            <div className="entry-counter">
                <span className="counter-text">You have visited <span id="count">6</span> amazing destinations</span>
            </div>
            <main className="container">
                {mapElement}
            </main>
        </>
    )
}