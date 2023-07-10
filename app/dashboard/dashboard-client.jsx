"use client";

import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { Inter } from "next/font/google";
// import styles from "@/styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setWholeProfile, incrementLatestDay } from "../../redux/profileSlice";
import { useAuthContext } from "../../context/AuthContext";
import firebase_app from "../../firebase/config";
import { getAuth, signOut } from "firebase/auth";
import getDocument from "../../firebase/firestore/getData";

export default function HomePage({ numOfDays }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = getAuth(firebase_app);

  // Get user and profile
  const { user } = useAuthContext();
  const profileData = useSelector((state) => state.profile);

  // If no user, redirect to login
  useEffect(() => {
    if (user === null) {
      router.push("/");
    }
  }, [user, router]);

  // If no profile, get profile
  useEffect(() => {
    if (profileData.firstName === null) {
      (async function getProfile() {
        const profileDoc = await getDocument("profiles", user.uid);
        dispatch(setWholeProfile(profileDoc));
      })();
    }
  });

  // Creates an array of numbers from 1 to the user's latest translation day
  const numOfDaysToDisplay = Math.min(numOfDays, profileData.latestDay);
  const daysArray = [...Array(numOfDaysToDisplay).keys()].map((n) => n + 1);

  // Functions
  function handleSignOut() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  }

  // Page
  return (
    <>
      <Head>
        <title>Advent Translator</title>
        <meta
          name="description"
          content="A Next.js app delivering a new translation challenge each day in Advent."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>
          Welcome to Advent Translation
          {profileData.firstName?.length > 0 && `, ${profileData.firstName}`},
          you are on day {profileData.latestDay}!
        </h1>
        <p>
          {profileData.firstName} {profileData.lastName}, favorite translation:{" "}
          {profileData.preferredTranslation}
        </p>
        {daysArray.map((n) => (
          <div className="day-link" key={n}>
            <Link href={`/days/${n}`} key={n}>
              Day {n}
            </Link>
          </div>
        ))}
      </div>
      <button onClick={() => dispatch(incrementLatestDay())}>
        Increment LatestDay
      </button>
      <br />
      <button onClick={handleSignOut}>Sign Out</button>
    </>
  );
}
