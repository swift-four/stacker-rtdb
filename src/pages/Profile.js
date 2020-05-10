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
			note: {},
		};
	}

	componentDidMount() {
		db.ref(`all_notes/${this.state.user.uid}`).on("value", (snapshot) => {
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
		const note = this.state.note;
		if (note && note.content) {
			return db
				.ref(`all_notes/${uid}/${note.note_id}`)
				.update({
					content,
				})
				.then((_) => {
					this.setState({ content: "", note: {} });
				});
		}
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

	editNote(note_id) {
		db.ref(`all_notes/${this.state.user.uid}/${note_id}`)
			.once("value")
			.then((snapshot) => {
				this.setState({
					note: snapshot.val(),
					content: snapshot.val().content,
				});
			});
	}

	deleteNote = (note_id) => {
		db.ref(`all_notes/${this.state.user.uid}/${note_id}`).remove();
	};

	render() {
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
				<div>
					<input onChange={this.handleChange} value={this.state.content} />
					<button onClick={this.createNote}>Create Note</button>
				</div>
				<Footer />
			</div>
		);
	}
}
