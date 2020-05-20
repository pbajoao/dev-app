const functions = require('firebase-functions');

const app = require('express')();

const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore().collection("usuarios");

app.get("/usuarios", (req, res)=>{

	return db.get()
		.then((docs)=>{
		let users = [];

		docs.forEach((docs)=>{
			users.push({id: doc.id, nome: doc.data().name});
		})

		//response.json(users);
		return users;

	})

});

exports.api = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
