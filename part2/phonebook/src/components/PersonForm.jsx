function PersonForm({
    submitFunction,
    nameChangeFunction,
    numberChangeFunction,
    nameValue,
    numberValue,
}) {
    return (
        <form onSubmit={submitFunction}>
            <div>
                name: <input value={nameValue} onChange={nameChangeFunction} />
            </div>
            <div>
                number:{' '}
                <input value={numberValue} onChange={numberChangeFunction} />
            </div>
            <div>
                <button type='submit'>add</button>
            </div>
        </form>
    );
}

export default PersonForm;
