"use client";

import { useState } from "react";
import signUp from "../../../firebase/auth/signup";
import { useRouter } from "next/navigation";
import { collection, doc, setDoc, addDoc, getDocs } from "firebase/firestore";
import addData from "../../../firebase/firestore/addData";
import { useDispatch, useSelector } from "react-redux";
import { setWholeProfile } from "../../../redux/profileSlice";
import { useAuthContext } from "../../../context/AuthContext";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [preferredTranslation, setPreferredTranslation] = useState("NIV");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const translationOptions = ["NIV", "NRSV", "ESV", "NASB"];
  const handleForm = async (event) => {
    event.preventDefault();

    try {
      const profileDoc = await signUp(
        firstName,
        lastName,
        preferredTranslation,
        email,
        password
      );
      // console.log("new user firebase id: ", credentials.user.uid);

      // create new profile object to push to db
      // const profileData = {
      //   firstName: firstName,
      //   lastName: lastName,
      //   // firebaseId: credentials.user.uid,
      //   latestDay: 1,
      //   preferredTranslation: "NRSV",
      // };
      // console.log(profileData);

      // Save profile to db
      // const { newFirestoreProfile, error2 } = await addData(
      //   "profiles",
      //   profileData
      // );
      // console.log("newFirestoreProfile", newFirestoreProfile);
      // setWholeProfile -- that is, push new returned profile data to Redux store (or Context or whatever I'm using)
      dispatch(setWholeProfile(profileDoc));

      // I MUST SET A CONDITION HERE THAT IF THERE ISN'T A PROFILE OR profileDoc, THEN I HAVE TO FIND IT AND RETRIEVE THE DOC HERE.

      // navigate to dashboard
      return router.push("/dashboard");
    } catch (error) {
      console.log(error);
      alert(error);
    }

    // create new profile in db, including new firebase id
    // const profile = await fetch(
    //   "http://127.0.0.1:8090/api/collections/profiles/records",
    //   {
    //     method: "POST",
    //     body: JSON.stringify(profileData),
    //     headers: {
    //       "Content-type": "application/json; charset=UTF-8",
    //     },
    //   }
    // )
    //   .then(function (response) {
    //     return response.json();
    //   })
    //   .then(function (data) {
    //     console.log(data);
    //   })
    //   .catch((error) => console.error("Error:", error));

    // Switching from PocketBase to Firebase Cloud Firestore

    // const querySnapshot = await getDocs(collection(db, "cities"));
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });

    // const newFirestoreProfile = await addDoc(
    //   collection(db, "profiles"),
    //   profileData
    // );
  };

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1 className="mt-60 mb-30">Sign up</h1>
        <form onSubmit={handleForm} className="form">
          <label htmlFor="first-name">
            <p>First Name</p>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              required
              type="first-name"
              name="firstName"
              id="first-name"
              placeholder="Jane"
            />
          </label>
          <label htmlFor="last-name">
            <p>Last Name</p>
            <input
              onChange={(e) => setLastName(e.target.value)}
              required
              type="last-name"
              name="lastName"
              id="last-name"
              placeholder="Nguyen"
            />
          </label>
          <label htmlFor="preferred-translation">
            <p>Preferred Translation</p>
            <select
              type="preferred-translation"
              name="preferredTranslation"
              id="preferred-translation"
              value={preferredTranslation}
              onChange={(e) => setPreferredTranslation(e.target.value)}
            >
              {translationOptions.map((translation, idx) => (
                <option key={idx} value={translation}>
                  {translation}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="email">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
            />
          </label>
          <label htmlFor="password">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
          </label>
          <button type="submit">Sign up</button>
        </form>
      </div>
    </div>
  );
}
