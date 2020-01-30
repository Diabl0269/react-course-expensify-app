import * as firebase from "firebase";

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MESUREMENT_ID
};

firebase.initializeApp(config);
const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };

// database.ref('expenses').on('child_removed', (snapshot)=>{
//   console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses').on('child_changed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses').on('child_added', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses').on("value", (snapshot) => {
//   const expenses =[];
//   snapshot.forEach((childSnapshot) => {
//     expenses.push({
//       id: childSnapshot.key,
//       ...childSnapshot.val()
//     });
//   });
//   console.log(expenses);
// });

// database.ref('expenses').push({
//   desctiption: 'Rent'
// });
// database.ref('expenses').push({
//   desctiption: 'Addictions'
// });
// database.ref('expenses').push({
//   desctiption: 'Bills'
// });

// const onValChange = database.ref().on(
//   "value",
//   snapshot => {
//     const val = snapshot.val();
//     console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
//   },
//   error => {
//     console.log("error: ", error);
//   }
// );

// database.ref().update({
//   name: "upidupi",
//   "job/company": "somewhere"
// });

// setTimeout(() => {
//   database.ref().update({
//     name: "Definitely Not Tal",
//     "job/company": "Google"
//   });
// }, 3000);

// setTimeout(()=> {
//   database.ref().off('value', onValChange)
// }, 3000);

// setTimeout(() => {
//   database.ref().update({
//     name: "Definitely Not Tal",
//     "job/company": "Doodle"
//   });
// }, 3000);

// database.ref().once('value')
// .then((snapshot) => {
//   const val = snapshot.val();
//   console.log(val);

// })
// .catch(e => {
//   console.log('error: ', e);

// });

// firebase
//   .database()
//   .ref()
//   .set({
//     name: "Tal Efronny",
//     age: 23,
//     stressLevel: 6,
//     job: {
//       title: "Software developer",
//       company: "Google"
//     },
//     location: {
//       city: "Netanya",
//       state: "Israel"
//     }
//   })
//   .then(data => console.log("succefull set", data))
//   .catch(error => console.log(error));

// db.ref()
//   .update({
//     stressLevel: 9,
//     "job/company": "Amazon",
//     "location/city": "Amsterdam"
//   })
//   .then(d => console.log("succefull remove ", d))
//   .catch(e => console.log("error: ", e));
