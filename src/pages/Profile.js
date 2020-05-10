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
		db.ref("all_notes/0001").on("value", (snapshot) => {
			let allNotes = [];
			snapshot.forEach((snap) => {
				allNotes.push(snap.val());
			});
			this.setState({ notes: allNotes });
		});
	}

	handleChange = (e) => {
		this.setState({ content: e.target.value });
	};

	createNote = () => {
		const uid = this.state.user.uid;
		const { content } = this.state;
		const note_id = `note-${Date.now()}`;

		db.ref(`all_notes/${uid}/${note_id}`)
			.set({
				content,
				note_id,
				uid,
			})
			.then((_) => {
				this.setState({ content: "" });
			});
	};

	render() {
		console.log(this.state.notes);
		return (
			<div>
				<Header />
				<div>
					Logged in as: <strong>{this.state.user.email}</strong>
				</div>
				{this.state.notes.map((note) => {
					return <div key={note.note_id}>{note.content}</div>;
				})}
				<Footer />
			</div>
		);
	}
}
