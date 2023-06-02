"use client";

import NoUserHome from "./auth/page";
import SignIn from "./auth/signin/page";
import SignUp from "./auth/signup/page.jsx";
import { useAuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/dashboard");
  }, [user, router]);

  return (
    <>
      <NoUserHome />
      <SignIn />
      <SignUp />
    </>
  );
}
