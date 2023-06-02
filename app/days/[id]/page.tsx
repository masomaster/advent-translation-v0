import { getDayData, getNumOfDays } from "../../../lib/days";
import { DayData } from "../../types";

// export async function getStaticProps({ params }: { params: { id: number } }) {
//   const dayData = await getDayData(params.id);
//   return {
//     props: {
//       dayData,
//     },
//   };
// }

// export async function getStaticPaths() {
//   // This gets the number of days for which translation texts exist,
//   // then formats them properly for Next.js to use in pre-rendering
//   const pathsToPreRender = [...Array(getNumOfDays()).keys()].map((n) => {
//     return {
//       params: {
//         id: `${n + 1}`,
//       },
//     };
//   });
//   return {
//     paths: pathsToPreRender,
//     fallback: "blocking",
//   };
// }

// I'm told generateStaticParams effectively replaces getStaticPaths (above), but I haven't gotten it to work yet.
// Statically generates routes at build time instead of on-demand at request time.
// export async function generateStaticParams() {
//   const pathsToPreRender = [...Array(25).keys()];

//   return pathsToPreRender.map((n) => ({
//     slug: n + 1,
//   }));
// }
async function getProfile() {
  // const res = await fetch(
  //   "http://127.0.0.1:8090/api/collections/profiles/records/1urs7uguurwwzf7"
  // );
  // const data = await res.json();
  // return data;
}

async function getTranslations(dayNum: number, profileID: string) {
  // const record = await pb
  //   .collection("translations")
  //   .getFirstListItem(`day='1'` && `profile='1urs7uguurwwzf7'`, {
  //     $autoCancel: false,
  //   });
  // console.log(record);
  console.log({ dayNum }, { profileID });
  // const res = await fetch(
  //   `http://127.0.0.1:8090/api/collections/translations/records/?filter=%28profile%3D%27${profileID}%27%20%26%26%20day%3D%27${dayNum}%27%29`
  // );
  // const data = await res.json();
  // const translations = data.items[0];

  // console.log({ translations });
  // return translations;
}

export default async function Page({ params }: any) {
  // Gets and sets user's existing translations for the day
  const dayNum = params.id;
  const profileID = "1urs7uguurwwzf7";
  const profileData = await getProfile();
  console.log(profileData);

  // Note: this approach of type conformity ("as DayData") is not ideal,
  // but suffices for now. Could fix later.
  const staticDayData: DayData = (await getDayData(dayNum)) as DayData;
  console.log({ staticDayData });

  const translations = await getTranslations(dayNum, profileID);
  console.log({ translations });
  return (
    <div>
      <h1>Day {staticDayData.dayNumber}</h1>
      <p>
        Hebrew: <span className="hebrew">{staticDayData.hebrew}</span> from{" "}
        {staticDayData.hebrewVerse}
      </p>
      <p>
        Your translation:{" "}
        {(translations && translations.hebrew) || "Give it a shot!"}
      </p>
      <p>
        Greek: <span className="greek">{staticDayData.greek}</span> from{" "}
        {staticDayData.greekVerse}
      </p>
      <p>
        Your translation:{" "}
        {(translations && translations.greek) || "Give it a shot!"}
      </p>
    </div>
  );
}
