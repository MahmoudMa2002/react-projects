import Header from "./components/Header"
import Entry from "./components/Entry"
import mapData from "./data.js"

export default function App() {

    const mapElement = mapData.map((area) => {
        return <Entry
            key={area.id}
            {...area}
        />
    })

    return (
        <>
            <Header />
            <main className="container">
                {mapElement}
            </main>
        </>
    )
}