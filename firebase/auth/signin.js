import firebase_app from "../config";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import getDocument from "../firestore/getData";

const auth = getAuth(firebase_app);

export default async function signIn(email, password) {
  let credentials = null,
    error = null;
  try {
    credentials = await signInWithEmailAndPassword(auth, email, password);
    const uid = credentials.user.uid;
    const profileDoc = await getDocument("profiles", uid);
    return profileDoc;
  } catch (e) {
    error = e;
    console.log("error", error);
  }
}
