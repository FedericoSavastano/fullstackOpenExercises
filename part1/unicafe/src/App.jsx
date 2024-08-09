import { useState } from 'react';

const Button = ({ onClickFunction, name }) => {
    return <button onClick={onClickFunction}>{name}</button>;
};

const Statistics = ({ good, bad, neutral }) => {
    if (!good && !bad && !neutral) {
        return <p> No feedback given </p>;
    }

    return (
        <>
            <h2>Statistics</h2>
            <table>
                <tbody>
                    <StatisticLine text={'good'} value={good}></StatisticLine>
                    <StatisticLine
                        text={'neutral'}
                        value={neutral}></StatisticLine>
                    <StatisticLine text={'bad'} value={bad}></StatisticLine>
                    <StatisticLine
                        text={'all'}
                        value={good + neutral + bad}></StatisticLine>
                    <StatisticLine
                        text={'average'}
                        value={
                            (good - bad) / (good + neutral + bad)
                        }></StatisticLine>
                    <StatisticLine
                        text={'positive'}
                        value={`${
                            (good / (good + neutral + bad)) * 100
                        } %`}></StatisticLine>
                </tbody>
            </table>
        </>
    );
};

const StatisticLine = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    );
};

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const handleGoodFeedbackClick = () => setGood(good + 1);
    const handleNeutralFeedbackClick = () => setNeutral(neutral + 1);
    const handleBadFeedbackClick = () => setBad(bad + 1);

    return (
        <div>
            <h2>Give Feedback</h2>
            <Button
                onClickFunction={handleGoodFeedbackClick}
                name={'Good'}></Button>
            <Button
                onClickFunction={handleNeutralFeedbackClick}
                name={'Neutral'}></Button>
            <Button
                onClickFunction={handleBadFeedbackClick}
                name={'Bad'}></Button>

            <Statistics good={good} bad={bad} neutral={neutral}></Statistics>
        </div>
    );
};

export default App;
