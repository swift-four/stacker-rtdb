import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
	apiKey: "AIzaSyAdKE8pVi0aKm3wUe73nOmNmDF-uAhbCEg",
	authDomain: "stacker-rdb.firebaseapp.com",
	databaseURL: "https://stacker-rdb.firebaseio.com",
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();
