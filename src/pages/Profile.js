import React, { Component } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { auth, db } from "../services/firebase";

export default class Profile extends Component {
	constructor() {
		super();
		this.state = {
			user: auth().currentUser,
			notes: [],
			content: "",
		};
	}

	componentDidMount() {
		db.ref(`all_notes/0001}`).on("value", (snapshot) => {
			let allNotes = [];
			snapshot.forEach((snap) => {
				allNotes.push(snap.val());
			});
			this.setState({ notes: allNotes });
		});
	}

	render() {
		console.log(this.state.notes);
		return (
			<div>
				<Header />
				<div>
					Logged in as: <strong>{this.state.user.email}</strong>
				</div>
				{this.state.notes.map((note) => {
					return (
						<div key={note.note_id}>
							<p>{note.content}</p>
							<button onClick={() => this.editNote(note.note_id)}>
								Edit Note
							</button>
							<button onClick={() => this.deleteNote(note.note_id)}>
								Delete
							</button>
						</div>
					);
				})}
				<Footer />
			</div>
		);
	}
}
