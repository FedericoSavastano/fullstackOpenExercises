function Filter({ filter, onChangeFunction }) {
    return (
        <div>
            filter: <input value={filter} onChange={onChangeFunction} />
        </div>
    );
}

export default Filter;
