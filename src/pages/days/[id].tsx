import { useEffect, useState } from "react";
import { getDayData, getNumOfDays } from "../../../lib/days";
import PocketBase from "pocketbase";

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
  const [translations, setTranslations] = useState({ hebrew: "", greek: "" });

  // Gets and sets user's existing translations for the day
  // This might be over-engineered, but as far as I can tell from the docs,
  // this is how it's supposed to be.
  // Can revisit later.
  useEffect(() => {
    (async function getDayTranslations() {
      const translationData = await pb
        .collection("translations")
        .getFirstListItem(
          `day='${dayData.dayNumber}'` && `profile='${profile}'`,
          {
            $autoCancel: false,
          }
        );
      const updatedTranslationData = {
        hebrew: translationData.hebrew,
        greek: translationData.greek,
      };
      setTranslations(updatedTranslationData);
    })();
  }, [dayData.dayNumber, profile]);

  return (
    <div>
      <h1>Day {dayData.dayNumber}</h1>
      <p>
        Hebrew: <span className="hebrew">{dayData.hebrew}</span> from{" "}
        {dayData.hebrewVerse}
      </p>
      <p>
        Your translation:{" "}
        {translations?.hebrew
          ? translations.hebrew
          : "None yet. Give it a shot!"}
      </p>
      <p>
        Greek: <span className="greek">{dayData.greek}</span> from{" "}
        {dayData.greekVerse}
      </p>
      <p>
        Your translation:{" "}
        {translations?.greek ? translations.greek : "None yet. Give it a shot!"}
      </p>
    </div>
  );
}
