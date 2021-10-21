import { useState } from "react"

function Show(props) {

    const id = props.match.params.id;
    const people = props.people;
    const person = people.find(p => p._id === id);

    // state for form
    const [editForm, setEditForm] = useState(person);

    // handleChange function for form
    const handleChange = event => {
        setEditForm({ ...editForm, [event.target.name]: event.target.value });
    }

    // handlesubmit for form
    const handleSubmit = event => {
        event.preventDefault();
        props.updatePeople(editForm, person._id);
        console.log(person.name)
        // redirect people back to index
        props.history.push("/");
    }

    //delete function for person
    const removePerson = () => {
        props.deletePeople(person._id);
        // redirect people back to index
        props.history.push("/");
    }

    return (
        <div className="person">
            <h1>{person.name}</h1>
            <h2>{person.title}</h2>
            <img src={person.image} alt={person.name} />
            <button id="delete" onClick={removePerson}>
                DELETE
            </button>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={editForm.name}
                    name="name"
                    placeholder="name"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    value={editForm.image}
                    name="image"
                    placeholder="image URL"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    value={editForm.title}
                    name="title"
                    placeholder="title"
                    onChange={handleChange}
                />
                <input type="submit" value="Update Person" />
            </form>
        </div>
    )
}

export default Show;