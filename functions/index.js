const functions = require('firebase-functions');

const app = require('express')();

const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore().collection("usuarios");

app.get("/users", (request, response) => {
	return db.get().then((docs) => {
		let users = [];
		docs.forEach((doc) => {
			users.push({
				name: doc.data().name,
				birth: doc.data().birth,
				dateRegister: doc.data().dateRegister,
				foot: doc.data().foot,
				height: doc.data().height,
				imgBg: doc.data().imgBg,
				imgPerson: doc.data().imgPerson,
				lastName: doc.data().lastName,
				nick: doc.data().nick
			})
		})
		return response.json(users);
	});
})

app.post("/user", (request, response) => {
	return db.add({ 
		birth: request.body.birth,
		dateRegister: request.body.dateRegister,
		foot: request.body.foot,
		height: request.body.height,
		imgBg: request.body.imgBg,
		imgPerson: request.body.imgPerson,
		lastName: request.body.lastName,
		name: request.body.name,
		nick: request.body.nick
	})
		.then(() => {
			return response.json(null);
		})
})

exports.api = functions.https.onRequest(app);