"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { Inter } from "next/font/google";
// import styles from "@/styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setWholeProfile, incrementLatestDay } from "../../redux/profileSlice";
import { useAuthContext } from "../../context/AuthContext";
import firebase_app from "../../firebase/config";
import { getAuth, signOut } from "firebase/auth";
import getDocument from "../../firebase/firestore/getData";

export default function HomePage({ numOfDays }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = getAuth(firebase_app);
  const [profile, setProfile] = useState(null);

  // Get user and profile
  const { user } = useAuthContext();
  let profileData = useSelector((state) => state.profile);
  console.log("profileData", profileData);

  // If no user, redirect to login
  useEffect(() => {
    if (user === null) {
      router.push("/");
    }
  }, [user, router]);

  // If no profile, get profile
  useEffect(() => {
    if (profileData.firstName === null) {
      // I want to move this function to the backend, probably a file /redux. It should return the profile data.
      const getProfile = async () => {
        const profile2 = await getDocument("profiles", user.uid);
        console.log(profile2);
        setProfile(profile2);
        dispatch(setWholeProfile(profile2));
        return profile2;
      };
      const profile = getProfile();
    }
  });
  // getProfile();

  // NOTE TO SELF: I NOW CAN GET PROFILE DATA ON THE FRONT END IF IT ISN'T PRESENT.
  // I NEED TO SORT OUT HOW I'M GOING TO SAVE IT AS STATE. AND CLEAN UP A BUNCH OF UNNECESSARY CRAP.

  // Unnecessary now:
  // const getToken = async () => {
  //   const token = await user.getIdToken();
  //   console.log(token);
  // };
  // getToken();

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
