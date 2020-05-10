import firebase from "firebase";
const config = {
  apiKey: "YOUR_DETAILS_HERE",
  authDomain: "YOUR_DETAILS_HERE",
  databaseURL: "YOUR_DETAILS_HERE"
};

firebase.initializeApp(config);

export const auth = firebase.auth;
