import { useAuthContext } from "../../../context/AuthContext";
import firebase_app from "../../../firebase/config";
import { getAuth } from "firebase/auth";
import { getDayData } from "../../../lib/days";
import { DayData } from "../../types";
import DayClient from "./day-client";

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
async function getProfile() {}

async function getTranslations(dayNum: number, profileID: string) {}

export default async function Page({ params }: any) {
  // Gets and sets user's existing translations for the day
  const dayNum = params.id;

  // const auth = getAuth(firebase_app);
  // const { user } = useAuthContext();
  // const profileID = user.uid;

  // const profileData = await getProfile();
  // console.log(profileData);

  // Note: this approach of type conformity ("as DayData") is not ideal,
  // but suffices for now. Could fix later.
  const staticDayData: DayData = (await getDayData(dayNum)) as DayData;
  console.log({ staticDayData });

  // const translations = await getTranslations(dayNum, profileID);
  // console.log({ translations });
  return <DayClient dayData={staticDayData} />;
}
