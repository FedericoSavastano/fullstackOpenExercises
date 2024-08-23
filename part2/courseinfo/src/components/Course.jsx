const Course = ({ course }) => {
    const total = course.parts.reduce(
        (accumulator, currentValue) => accumulator + currentValue.exercises,
        0
    );
    return (
        <>
            {' '}
            <Header course={course}></Header>
            <Content course={course}></Content>
            <p>
                <b>total of {total} exercises</b>
            </p>
        </>
    );
};

const Header = ({ course }) => {
    return <h1>{course.name}</h1>;
};

const Content = ({ course }) => {
    return (
        <>
            {course.parts.map((part) => (
                <Part part={part} key={part.id}></Part>
            ))}
        </>
    );
};

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    );
};

export default Course;
