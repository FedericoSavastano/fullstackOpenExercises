function Persons({ persons, filterValue, deleteFunction }) {
    return (
        <ul>
            {persons &&
                persons
                    .filter((p) =>
                        p.name.toLowerCase().includes(filterValue.toLowerCase())
                    )
                    .map((p) => (
                        <li key={p.id}>
                            {p.name} - {p.number}{' '}
                            <button
                                onClick={(event) =>
                                    deleteFunction(event, p.id, p.name)
                                }>
                                Delete
                            </button>
                        </li>
                    ))}
        </ul>
    );
}

export default Persons;
