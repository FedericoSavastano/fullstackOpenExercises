import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

import personsService from './services/persons';

import './App.css';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');
    const [message, setMessage] = useState(null);

    useEffect(() => {
        personsService
            .getAll()
            .then((initialPersons) => {
                setPersons(initialPersons);
            })
            .catch((error) => {
                console.log(error);

                setMessage(
                    `error: the phonebook list could not be loaded. try again`
                );
                setTimeout(() => {
                    setMessage(null);
                }, 5000);
            });
    }, []);

    const handleNameChange = (event) => {
        event.preventDefault();
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        event.preventDefault();
        setNewNumber(event.target.value);
    };

    const handleFilterChange = (event) => {
        event.preventDefault();
        setFilter(event.target.value);
    };

    const handleDeletePerson = (event, id, name) => {
        event.preventDefault();
        if (window.confirm(`Do you want to delete ${name} ?`)) {
            personsService
                .deleteItem(id)
                .then((deletedPerson) => {
                    setPersons(
                        persons.filter(
                            (person) => person.id !== deletedPerson.id
                        )
                    );

                    setMessage(`${name} was deleted`);
                    setTimeout(() => {
                        setMessage(null);
                    }, 5000);
                })
                .catch((error) => {
                    console.log(error);

                    setMessage(
                        `error: ${name} was already deleted from server`
                    );
                    setTimeout(() => {
                        setMessage(null);
                    }, 5000);

                    setPersons(persons.filter((n) => n.id !== id));
                });
        }
    };

    const addNewName = (event) => {
        event.preventDefault();
        const personsNameInList = persons.map((e) => e.name.toLowerCase());

        if (!newName || !newNumber) {
            alert('Please fill all details');
            return;
        }

        if (personsNameInList.includes(newName.toLowerCase())) {
            if (
                window.confirm(
                    `${newName} is already added to the phonebook. Replace the old number with new one?`
                )
            ) {
                let { id: idP } = persons.filter(
                    (p) => p.name.toLowerCase() === newName.toLowerCase()
                )[0];

                personsService
                    .update(idP, { name: newName, number: newNumber })
                    .then((newPerson) => {
                        setPersons(
                            persons.map((p) =>
                                p.name.toLowerCase() === newName.toLowerCase()
                                    ? newPerson
                                    : p
                            )
                        );
                        setNewName('');
                        setNewNumber('');

                        setMessage(`${newName} was updated`);
                        setTimeout(() => {
                            setMessage(null);
                        }, 5000);
                    })
                    .catch((error) => {
                        console.log(error);
                        console.log(idP);
                        setMessage(
                            `error: the note '${newName}' could not be updated. try again`
                        );
                        setTimeout(() => {
                            setMessage(null);
                        }, 5000);

                        setPersons(persons.filter((n) => n.id !== idP));
                    });
            }

            return;
        }

        personsService
            .create({
                name: newName,
                number: newNumber,
            })
            .then((newPerson) => {
                setPersons(persons.concat(newPerson));
                setNewName('');
                setNewNumber('');

                setMessage(`${newName} was created`);
                setTimeout(() => {
                    setMessage(null);
                }, 5000);
            })
            .catch((error) => {
                console.log(error);

                setMessage(
                    `error: the person '${newName}' could not be registered. try again`
                );
                setTimeout(() => {
                    setMessage(null);
                }, 5000);
            });
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message}></Notification>
            <Filter
                filter={filter}
                onChangeFunction={handleFilterChange}></Filter>

            <h3>Add a new person</h3>
            <PersonForm
                nameValue={newName}
                numberValue={newNumber}
                submitFunction={addNewName}
                nameChangeFunction={handleNameChange}
                numberChangeFunction={handleNumberChange}></PersonForm>

            <h2>Numbers</h2>
            <Persons
                persons={persons}
                filterValue={filter}
                deleteFunction={handleDeletePerson}></Persons>
        </div>
    );
};

export default App;
