import firebase_app from "../config";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

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
    console.log(credentials.user.uid);
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      preferredTranslation: preferredTranslation,
      latestDay: 1,
    };
    console.log("newUser", newUser);
    await setDoc(doc(db, "profiles", credentials.user.uid), { ...newUser });
  } catch (e) {
    error = e;
  }

  return { credentials, error };
}
