import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAzDz5rbgAq6X88wy9H7r3ENRUpeTwm5T4',
  authDomain: 'react-chat-app-79254.firebaseapp.com',
  databaseURL: 'https://react-chat-app-79254.firebaseio.com',
  projectId: 'react-chat-app-79254',
  storageBucket: 'react-chat-app-79254.appspot.com',
  messagingSenderId: '784510638433',
  appId: '1:784510638433:web:9480b891297bd466b50d20',
  measurementId: 'G-LTFNFX215H',
}

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const db = firebase.firestore()
export const provider = new firebase.auth.GoogleAuthProvider()

export default firebase
