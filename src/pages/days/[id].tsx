import { useEffect, useState } from "react";
import { getDayData, getNumOfDays } from "../../../lib/days";
import PocketBase from "pocketbase";
import useSWR from "swr";

const pb = new PocketBase("http://127.0.0.1:8090");

export async function getStaticProps({ params }: { params: { id: number } }) {
  const dayData = await getDayData(params.id);
  return {
    props: {
      dayData,
    },
  };
}

export async function getStaticPaths() {
  // This gets the number of days for which translation texts exist,
  // then formats them properly for Next.js to use in pre-rendering
  const pathsToPreRender = [...Array(getNumOfDays()).keys()].map((n) => {
    return {
      params: {
        id: `${n + 1}`,
      },
    };
  });
  return {
    paths: pathsToPreRender,
    fallback: "blocking",
  };
}

export default function Day({ dayData }: { dayData: any }) {
  const [profile, setProfile] = useState("1urs7uguurwwzf7");

  // Gets and sets user's existing translations for the day
  const { data, isLoading } = useSWR(
    "/getTranslations",
    async () =>
      await pb
        .collection("translations")
        .getFirstListItem(
          `day='${dayData.dayNumber}'` && `profile='${profile}'`,
          {
            $autoCancel: false,
          }
        )
  );

  return (
    <div>
      <h1>Day {dayData.dayNumber}</h1>
      <p>
        Hebrew: <span className="hebrew">{dayData.hebrew}</span> from{" "}
        {dayData.hebrewVerse}
      </p>
      <p>
        Your translation:{" "}
        {isLoading
          ? "Loading..."
          : data?.hebrew
          ? data.hebrew
          : "None yet. Give it a shot!"}
      </p>
      <p>
        Greek: <span className="greek">{dayData.greek}</span> from{" "}
        {dayData.greekVerse}
      </p>
      <p>
        Your translation:{" "}
        {isLoading
          ? "Loading..."
          : data?.greek
          ? data.greek
          : "None yet. Give it a shot!"}{" "}
      </p>
    </div>
  );
}
