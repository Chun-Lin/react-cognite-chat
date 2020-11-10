import firebase, { db } from 'firebaseSetting'

export const sendMessage = (chatroomId, mainUser, inputValue) => {
  return db.collection('chatrooms').doc(chatroomId).collection('messages').add({
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    message: inputValue,
    sender: mainUser,
  })
}
