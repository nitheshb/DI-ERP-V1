// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getFirestore, initializeFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// import { initializeApp } from 'firebase-admin/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// const firebaseConfig = {
//   apiKey: "AIzaSyBpmAFvBc0BQafyXdblYv3w2f7fCy0G0Yc",
//   authDomain: "di-erp-4d5d9.firebaseapp.com",
//   projectId: "di-erp-4d5d9",
//   storageBucket: "di-erp-4d5d9.appspot.com",
//   messagingSenderId: "91197028811",
//   appId: "1:91197028811:web:2ecf665131b6c5507cde4e",
//   measurementId: "G-YRL8BKE71M"
// };

const firebaseConfig = {
  apiKey: "AIzaSyAw6Hk91dJH5COTgz46ponbflO4iIwGfQU",
  authDomain: "di-cycle-erp.firebaseapp.com",
  projectId: "di-cycle-erp",
  storageBucket: "di-cycle-erp.appspot.com",
  messagingSenderId: "760706234070",
  appId: "1:760706234070:web:a08f300875582e56effb77",
  measurementId: "G-FN8TT6LJNR"
};

const settings = {
  experimentalForceLongPolling: true,
}
// Initialize Firebase

const app = initializeApp(firebaseConfig)
// initializeFirestore(app, settings)

// firebase.firestore().settings({ experimentalForceLongPolling: true });
// const db = getFirestore(app)
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
})
const storage = getStorage()

// export const auth = app.auth()
const auth = getAuth()
const analytics = getAnalytics(app)

export { auth, db, storage }
