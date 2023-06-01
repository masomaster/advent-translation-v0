import firebase_app from "../config";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import getDocument from "../../firebase/firestore/getData";

const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app);

export default async function signUp(
  firstName,
  lastName,
  preferredTranslation,
  email,
  password
) {
  let credentials = null,
    error = null;
  try {
    credentials = await createUserWithEmailAndPassword(auth, email, password);
    console.log(credentials);
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      preferredTranslation: preferredTranslation,
      latestDay: 1,
    };
    console.log("newUser", newUser);
    const uid = credentials.user.uid;
    await setDoc(doc(db, "profiles", uid), { ...newUser });
    // Here I want to getDoc using the uid. Then I want to return that doc. That will send the user profile doc back to the pge.jsx which called this function. From that page, I can (somehow) assign that user doc to global state.
    const profileDoc = await getDocument("profiles", uid);
    console.log("profileDoc", profileDoc);
    return profileDoc;
  } catch (e) {
    error = e;
    console.log("error", error);
  }
}
