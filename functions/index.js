const functions = require('firebase-functions');

const app = require('express')();

const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore().collection("usuarios");

//recuperar usuario authenticado
// getAuth() {
// 	return this.angularFireAuth.auth;
// }

//registrar usuario
// register(user: LoginContext) {
//     return this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
// }

//recuperar senha 
// resetPassword(email: string){
//     return this.angularFireAuth.auth.sendPasswordResetEmail(email);
// }

//sair do app
// logout(){
//     return this.angularFireAuth.auth.signOut();
// }

// login
// app.post("login", (request, response) => {
// 	return this.angularFireAuth.auth.signInWithEmailAndPassword(user.email, user.password);
// });

//recuperar todos usuarios
// usuarios(user: any, groupUser) {
// 	return this.angularFirestore.collection('usuarios').doc<User>(groupUser.user.uid).set(user)
// }

//recuperar usuario atual
// getDatePersonal(id: string) {
// 	return this.angularFirestore.collection('usuarios').doc<User>(id).valueChanges();
// }

//alterar usuario atual
// updateDatePersonal(id: string, person: User) {
// 	return this.angularFirestore.collection('usuarios').doc<User>(id).update(person);
// }

// refefencia da imagem
// refPicture(namePicture: string){
// 	return this.angularFireStorage.ref(`img/profile/${namePicture}`);
// }

// atualizar imagem
// uploadPicture(refPicture, blob: Blob){
// 	return refPicture.put(blob);
// }

//remover imagem
// removePicture(refPicture: string){
// 	return this.angularFireStorage.storage.refFromURL(refPicture).delete();
// }

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
			return response.json({"response":"inserido"});
		})
})

exports.api = functions.https.onRequest(app);