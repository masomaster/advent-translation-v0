"use client";

export default function Page() {
  const dayData = {
    dayNumber: 1,
    hebrew: "כִּי־אָנֹכִי־הָאֱלֹהִים",
    hebrewVerse: "Isaiah 43:10",
    greek: "γινώσκω",
    greekVerse: "John 1:18",
  };
  // Gets and sets user's existing translations for the day

  return (
    <div>
      <h1>Day {dayData.dayNumber}</h1>
      <p>
        Hebrew: <span className="hebrew">{dayData.hebrew}</span> from{" "}
        {dayData.hebrewVerse}
      </p>
      <p>Your translation: here</p>
      <p>
        Greek: <span className="greek">{dayData.greek}</span> from{" "}
        {dayData.greekVerse}
      </p>
      <p>Your translation:here</p>
    </div>
  );
}
