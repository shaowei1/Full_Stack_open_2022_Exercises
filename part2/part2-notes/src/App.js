import { useEffect, useState } from "react";
import axios from "axios";
import Person from "./components/Person";

const Persons = (prop) => (
	<ul>
		{prop.persons.map((person) => (
			<Person key={person.id} person={person} />
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
		console.log("effect");
		axios.get("http://localhost:3001/persons").then((response) => {
			console.log("promise fulfilled");
			setPersons(response.data);
		});
	}, []);
	const addPerson = (event) => {
		event.preventDefault();
		console.log("button clicked", event.target);

		const same_name_flag = persons.find((person) => person.name === newName);
		if (same_name_flag !== undefined) {
			window.alert(`${newName} is already added to phonebook`);
		} else {
			const personObject = {
				name: newName,
				number: newPhoneNumber,
				date: new Date().toISOString(),
				important: Math.random() < 0.5,
				id: persons.length + 1,
			};
			setPersons(persons.concat(personObject));
			setNewName("");
			setnewPhoneNumber("");
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
			<Persons persons={nameToShow} />
		</div>
	);
};
export default App;
