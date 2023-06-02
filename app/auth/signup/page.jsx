"use client";

import { useState } from "react";
import signUp from "../../../firebase/auth/signup";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setWholeProfile } from "../../../redux/profileSlice";

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
      dispatch(setWholeProfile(profileDoc));

      // I MUST SET A CONDITION HERE THAT IF THERE ISN'T A PROFILE OR profileDoc, THEN I HAVE TO FIND IT AND RETRIEVE THE DOC HERE.

      // navigate to dashboard
      return router.push("/dashboard");
    } catch (error) {
      console.log(error);
      alert(error);
    }
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
