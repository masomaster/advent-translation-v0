import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
// import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { getNumOfDays } from "../../lib/days";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async (context) => {
  const numOfDays = getNumOfDays();
  return {
    props: {
      numOfDays,
    },
  };
};

export default function Home({ numOfDays }: { numOfDays: number }) {
  // create an array of numbers from 1 to numOfDays
  const daysArray1 = [...Array(numOfDays).keys()].map((n) => n + 1);

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
        <h1>Welcome to Advent Translation!</h1>
        {daysArray1.map((n) => (
          <div className="day-link" key={n}>
            <Link href={`/days/${n}`} key={n}>
              Day {n}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
