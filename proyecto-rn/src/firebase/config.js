import app from 'firebase/app'
import firebase from 'firebase'



// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDAHShz4eRvZzRkaRIk_SJTZ7yvjb4Qr6c",
//   authDomain: "react-native-a5dcf.firebaseapp.com",
//   projectId: "react-native-a5dcf",
//   storageBucket: "react-native-a5dcf.appspot.com",
//   messagingSenderId: "656218260826",
//   appId: "1:656218260826:web:83d8938549731658b19f63"
// };
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOdmDTPqH5a0_qYz-l5wc9MK8V16k_pGI",
  authDomain: "proyecto-reactnative.firebaseapp.com",
  projectId: "proyecto-reactnative",
  storageBucket: "proyecto-reactnative.appspot.com",
  messagingSenderId: "107297439908",
  appId: "1:107297439908:web:dc894afc90c3c3517d6631"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();