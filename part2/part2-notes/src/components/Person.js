import React from "react";

const Person = ({ person, handlePersonInfoDelete }) => {
	return (
		<li>
			{person.name} {person.number}
			<button onClick={handlePersonInfoDelete}>delete</button>
		</li>
	);
};

export default Person;
