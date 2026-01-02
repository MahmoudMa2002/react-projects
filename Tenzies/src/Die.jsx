export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#3b82f6" : "#8899AA"
    }

    const renderDots = (value) => {
        const dotPositions = {
            1: [5],
            2: [1, 9],
            3: [1, 5, 9],
            4: [1, 3, 7, 9],
            5: [1, 3, 5, 7, 9],
            6: [1, 3, 4, 6, 7, 9]
        }

        return (
            <div className="die-face">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(position => (
                    <div
                        key={position}
                        className={`dot ${dotPositions[value].includes(position) ? 'active' : ''}`}
                    />
                ))}
            </div>
        )
    }

    return (
        <button
            style={styles}
            onClick={props.hold}
            className="die-button"
        >
            {renderDots(props.value)}
        </button>
    )
}