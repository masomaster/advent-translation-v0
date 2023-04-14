// "use client";
// import useSWR from "swr";
// import PocketBase from "pocketbase";
// const pb = new PocketBase("http://127.0.0.1:8090");

// export default async function DayPage(staticDayData, translations) {
//   const dayNum = 1;
//   const profileID = "1urs7uguurwwzf7";
//   const res = await fetch(
//     `http://127.0.0.1:8090/api/collections/translations/records/?filter=%28profile%3D%27${profileID}%27%20%26%26%20day%3D%27${dayNum}%27%29`
//   );
//   const data = await res.json();
//   const translationData = data.items;

//   console.log({ translationData });

//   // console.log({ staticDayData }, { translations });

//   return (
//     <div>
//       <h1>Day {staticDayData.dayNumber}</h1>
//       <p>
//         Hebrew: <span className="hebrew">{staticDayData.hebrew}</span> from{" "}
//         {staticDayData.hebrewVerse}
//       </p>
//       <p>Your translation: {translations.hebrew}</p>
//       <p>
//         Greek: <span className="greek">{staticDayData.greek}</span> from{" "}
//         {staticDayData.greekVerse}
//       </p>
//       <p>Your translation: {translations.greek}</p>
//     </div>
//   );
// }
