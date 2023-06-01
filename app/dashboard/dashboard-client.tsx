"use client";

import { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
// import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { GetStaticProps } from "next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { incrementLatestDay, setWholeProfile } from "../../redux/profileSlice";
import { useAuthContext } from "../../context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function HomePage({
  numOfDays,
  profile,
}: {
  numOfDays: number;
  profile: any;
}) {
  // Getting necessary variables
  const profileData = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();
  const { user } = useAuthContext();
  console.log("user", user);
  const auth = getAuth();
  const router = useRouter();
  // Creates an array of numbers from 1 to the user's latest translation day
  const numOfDaysToDisplay = Math.min(numOfDays, profileData.latestDay);
  const daysArray = [...Array(numOfDaysToDisplay).keys()].map((n) => n + 1);

  // useEffects
  useEffect(() => {
    if (user == null) router.push("/");
  }, [user, router]);

  useEffect(() => {
    dispatch(setWholeProfile(profile));
  }, [profile, dispatch]);

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
          {profileData.firstName.length > 0 && `, ${profileData.firstName}`},
          you are on day {profileData.latestDay}!
        </h1>
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
