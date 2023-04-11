"use client";

import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
// import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { GetStaticProps } from "next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { incrementLatestDay, setWholeProfile } from "../redux/profileSlice";

export default function HomePage({ numOfDays }: { numOfDays: number }) {
  const profileData = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();

  // THIS WILL EVENTUALLY BE REPLACED WITH A DATABASE QUERY
  // create an array of numbers from 1 to numOfDays
  const daysArray1 = [...Array(numOfDays).keys()].map((n) => n + 1);

  const dummyProfile = {
    firebaseID: "1urs7uguurwwzf7",
    firstName: "Mason",
    lastName: "Lancaster",
    latestDay: 3,
    preferredTranslation: "NRSV",
  };

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
          Welcome to Advent Translation{`, ${profileData.firstName}`}, you are
          on day {profileData.latestDay}!
        </h1>
        {daysArray1.map((n) => (
          <div className="day-link" key={n}>
            <Link href={`/days/${n}`} key={n}>
              Day {n}
            </Link>
          </div>
        ))}
      </div>
      <button onClick={() => dispatch(setWholeProfile(dummyProfile))}>
        Set Profile
      </button>
      <button onClick={() => dispatch(incrementLatestDay())}>
        Increment LatestDay
      </button>
    </>
  );
}
