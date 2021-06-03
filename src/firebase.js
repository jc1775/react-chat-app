import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyASRMtCp3u_Z7ybOsSmJsAk9RDuSebat3k",
  authDomain: "lofty-equinox-180517.firebaseapp.com",
  projectId: "lofty-equinox-180517",
  storageBucket: "lofty-equinox-180517.appspot.com",
  messagingSenderId: "546872849638",
  appId: "1:546872849638:web:310c20432628432cecb727",
  measurementId: "G-D06Q941N6N"
};

firebase.initializeApp(firebaseConfig)

export default firebase;