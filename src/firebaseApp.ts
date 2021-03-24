import firebase from 'firebase';

export const config = {
    apiKey: "AIzaSyD3TGvNPPA6t-rVSt5lZeLd40osMBqWZFA",
    authDomain: "tree-folder.firebaseapp.com",
    projectId: "tree-folder",
    storageBucket: "tree-folder.appspot.com",
    messagingSenderId: "755023052886",
    appId: "1:755023052886:web:9cdaf19ff830c1218bfbf7"
};

const firebaseApp = firebase.initializeApp(config);
const foldersRef = firebaseApp.database().ref();

firebaseApp.auth().signInWithEmailAndPassword('root@test.com', '123456');

export {
    firebaseApp,
    foldersRef
}
