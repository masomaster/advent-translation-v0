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
    // Create user
    credentials = await createUserWithEmailAndPassword(auth, email, password);

    // Create user profile for db
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      preferredTranslation: preferredTranslation,
      latestDay: 1,
    };
    const uid = credentials.user.uid;

    // Create user profile doc in db
    await setDoc(doc(db, "profiles", uid), { ...newUser });

    // Fetch created user profile doc from db, and return it to save in state on client-side
    const profileDoc = await getDocument("profiles", uid);
    return profileDoc;
  } catch (e) {
    error = e;
    console.log("error", error);
  }
}
