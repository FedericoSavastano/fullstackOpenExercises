import { useState } from 'react';

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.',
    ];

    const [selected, setSelected] = useState(0);

    const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));

    const [indexOfBestAnecdote, setIndexOfBestAnecdote] = useState(-1);

    const handleClickNextAnecdote = () => {
        let randomNumber = Math.floor(Math.random() * anecdotes.length);

        if (randomNumber === selected)
            selected === 0
                ? (randomNumber = anecdotes.length - 1)
                : (randomNumber = 0);

        setSelected(randomNumber);
    };

    const handleClickVote = () => {
        let newPoints = [...points];
        newPoints[selected] += 1;

        let maxNumber = Math.max(...newPoints);

        setIndexOfBestAnecdote(newPoints.indexOf(maxNumber));
        setPoints(newPoints);
    };

    return (
        <div>
            <h2>Anecdote of the day</h2>
            <p> {anecdotes[selected]}</p>
            <p>has {points[selected]} points</p>
            <button onClick={handleClickVote}>Vote</button>
            <button onClick={handleClickNextAnecdote}>Next Anecdote</button>

            <h2>Anecdote with most votes</h2>
            {indexOfBestAnecdote > -1 ? (
                <>
                    <p>{anecdotes[indexOfBestAnecdote]} </p>
                    <p>has {points[indexOfBestAnecdote]} points</p>
                </>
            ) : (
                <p>No votes yet</p>
            )}
        </div>
    );
};

export default App;
