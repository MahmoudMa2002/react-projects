import { useState, useEffect } from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
import useWindowSize from "react-use/lib/useWindowSize"

export default function App() {
    const { width, height } = useWindowSize()
    const [dice, setDice] = useState(() => generateAllNewDice())
    const [timer, setTimer] = useState(0)
    const [isTimerRunning, setIsTimerRunning] = useState(false)
    const [bestTime, setBestTime] = useState(() => {
        const saved = localStorage.getItem('tenziesBestTime')
        return saved ? parseInt(saved) : null
    })

    const gameWon = dice.every(die => die.isHeld) &&
        dice.every(die => die.value === dice[0].value)

    useEffect(() => {
        let interval
        if (isTimerRunning) {
            interval = setInterval(() => {
                setTimer(prev => prev + 1)
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [isTimerRunning])

    useEffect(() => {
        if (gameWon && isTimerRunning) {
            setIsTimerRunning(false)
            if (bestTime === null || timer < bestTime) {
                setBestTime(timer)
                localStorage.setItem('tenziesBestTime', timer)
            }
        }
    }, [gameWon])

    function generateAllNewDice() {
        return new Array(10)
            .fill(0)
            .map(() => ({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid()
            }))
    }

    function rollDice() {
        if (!gameWon) {
            if (!isTimerRunning) {
                setIsTimerRunning(true)
                setTimer(0)
            }

            setDice(oldDice => oldDice.map(die =>
                die.isHeld ?
                    die :
                    { ...die, value: Math.ceil(Math.random() * 6) }
            ))
        } else {
            setDice(generateAllNewDice())
            setTimer(0)
            setIsTimerRunning(false)
        }
    }

    function hold(id) {
        setDice(oldDice => oldDice.map(die =>
            die.id === id ?
                { ...die, isHeld: !die.isHeld } :
                die
        ))
    }

    const diceElements = dice.map(dieObj => (
        <Die
            key={dieObj.id}
            value={dieObj.value}
            isHeld={dieObj.isHeld}
            hold={() => hold(dieObj.id)}
        />
    ))

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    return (
        <main>
            {gameWon && <Confetti width={width} height={height} />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

            <div className="timer-container">
                <div className="timer">Time: {formatTime(timer)}</div>
                {bestTime !== null && (
                    <div className="best-time">Best: {formatTime(bestTime)}</div>
                )}
            </div>

            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" onClick={rollDice}>
                {gameWon ? "New Game" : "Roll"}
            </button>
        </main>
    )
}