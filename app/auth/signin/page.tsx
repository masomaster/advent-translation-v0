"use client";
import React from "react";
import signIn from "../../../firebase/auth/signin";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setWholeProfile } from "../../../redux/profileSlice";

export default function SignIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleForm = async (event: any) => {
    event.preventDefault();
    try {
      const profileDoc = await signIn(email, password);
      dispatch(setWholeProfile(profileDoc));
    } catch (error) {
      console.log(error);
    }
    return router.push("/dashboard");
  };
  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1 className="mt-60 mb-30">Sign In</h1>
        <form onSubmit={handleForm} className="form">
          <label htmlFor="email">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="SignInEmail"
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
              id="SignInPassword"
              placeholder="password"
            />
          </label>
          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
}
