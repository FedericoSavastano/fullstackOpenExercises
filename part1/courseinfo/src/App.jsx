const App = () => {
    const course = 'Half Stack application development';
    const part1 = 'Fundamentals of React';
    const exercises1 = 10;
    const part2 = 'Using props to pass data';
    const exercises2 = 7;
    const part3 = 'State of a component';
    const exercises3 = 14;

    const Header = ({ course }) => {
        return <h1>{course}</h1>;
    };

    const Content = ({
        part1,
        exercises1,
        part2,
        exercises2,
        part3,
        exercises3,
    }) => {
        return (
            <>
                <Part part={part1} excercise={exercises1}></Part>
                <Part part={part2} excercise={exercises2}></Part>
                <Part part={part3} excercise={exercises3}></Part>
            </>
        );
    };

    const Part = ({ part, excercise }) => {
        return (
            <p>
                {part} {excercise}
            </p>
        );
    };

    const Total = ({ exercises1, exercises2, exercises3 }) => {
        return (
            <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
        );
    };

    return (
        <div>
            <Header course={course}></Header>
            <Content
                part1={part1}
                exercises1={exercises1}
                part2={part2}
                exercises2={exercises2}
                part3={part3}
                exercises3={exercises3}></Content>

            <Total
                exercises1={exercises1}
                exercises2={exercises2}
                exercises3={exercises3}></Total>
        </div>
    );
};

export default App;
