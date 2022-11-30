import { useState } from "react";
import Person from "./components/Person";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
	]);
	const [newName, setNewName] = useState("");
	const [queryName, setQueryName] = useState("");
	const [newPhoneNumber, setnewPhoneNumber] = useState("");
	const [showAll, setShowAll] = useState(true);

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

	const handlePersonNameChange = (event) => {
		setQueryName(event.target.value);
	};
	const nameToShow =
		queryName === ""
			? persons
			: persons.filter((person) => person.name.toLowerCase().includes(queryName.toLowerCase()));
	return (
		<div>
			<h1>PhoneBook</h1>
			<div>
				<button onClick={() => setShowAll(!showAll)}>show {showAll ? "important" : "all"}</button>
			</div>
			<div>
				filter shown with
				<input value={queryName} onChange={handlePersonNameChange} />
			</div>

			<h2>add a new</h2>
			<form onSubmit={addPerson}>
				<div>
					name:
					<input value={newName} onChange={handleNameChange} />
				</div>
				<div>
					number: <input value={newPhoneNumber} onChange={handlePhoneNumberChange} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<ul>
				{nameToShow.map((person) => (
					<Person key={person.id} person={person} />
				))}
			</ul>
		</div>
	);
};
export default App;
