import { useEffect, useState } from "react";
import Person from "./components/Person";
import personService from "./services/persons";

const Persons = (prop) => (
	<ul>
		{prop.persons.map((person) => (
			<Person
				key={person.id}
				person={person}
				handlePersonInfoDelete={() => prop.handlePersonInfoDelete(person.id)}
			/>
		))}
	</ul>
);
const PersonForm = (prop) => (
	<form onSubmit={prop.addPerson}>
		<div>
			name:
			<input value={prop.newName} onChange={prop.handleNameChange} />
		</div>
		<div>
			number: <input value={prop.newPhoneNumber} onChange={prop.handlePhoneNumberChange} />
		</div>
		<div>
			<button type="submit">add</button>
		</div>
	</form>
);

const Filter = (prop) => (
	<div>
		filter shown with
		<input value={prop.queryName} onChange={prop.handleQueryNameChange} />
	</div>
);

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [queryName, setQueryName] = useState("");
	const [newPhoneNumber, setnewPhoneNumber] = useState("");
	useEffect(() => {
		personService.getAll().then((initialNotes) => {
			setPersons(initialNotes);
		});
	}, []);
	const addPerson = (event) => {
		event.preventDefault();
		const person = persons.find((person) => person.name === newName);
		if (person !== undefined) {
			window.alert(
				`${newName} is already added to phonebook, replace the old number with a new one?`,
			);
			const changedPerson = { ...person, number: newPhoneNumber };
			let id = person.id;
			personService.update(id, changedPerson).then((responsePerson) => {
				setPersons(persons.map((person) => (person.id !== id ? person : responsePerson)));
				setNewName("");
				setnewPhoneNumber("");
			});
		} else {
			const personObject = {
				name: newName,
				number: newPhoneNumber,
				date: new Date().toISOString(),
				important: Math.random() < 0.5,
			};
			personService.create(personObject).then((responsePerson) => {
				setPersons(persons.concat(responsePerson));
				setNewName("");
				setnewPhoneNumber("");
			});
		}
	};

	const handlePersonInfoDelete = (id) => {
		if (window.confirm(`Delete ${id} ?`)) {
			personService.delete_person(id).then((responsePerson) => {
				setPersons(persons.filter((person) => person.id !== id));
			});
		}
	};
	const handlePhoneNumberChange = (event) => {
		setnewPhoneNumber(event.target.value);
	};
	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handleQueryNameChange = (event) => {
		setQueryName(event.target.value);
	};
	const nameToShow =
		queryName === ""
			? persons
			: persons.filter((person) => person.name.toLowerCase().includes(queryName.toLowerCase()));
	return (
		<div>
			<h1>PhoneBook</h1>
			<Filter queryName={queryName} handleQueryNameChange={handleQueryNameChange} />

			<h2>add a new</h2>
			<PersonForm
				addPerson={addPerson}
				newName={newName}
				newPhoneNumber={newPhoneNumber}
				handleNameChange={handleNameChange}
				handlePhoneNumberChange={handlePhoneNumberChange}
			/>
			<h2>Numbers</h2>
			<Persons persons={nameToShow} handlePersonInfoDelete={handlePersonInfoDelete} />
		</div>
	);
};
export default App;
