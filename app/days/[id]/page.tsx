// import { getDayData, getNumOfDays } from "../../../lib/days";
import PocketBase from "pocketbase";
// import useSWR from "swr";
import DayPage from "./day";
const pb = new PocketBase("http://127.0.0.1:8090");

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
export default function Page() {
  // Gets and sets user's existing translations for the day
  const dayNumber = 1;

  // const { data, isLoading } = useSWR(
  //   "/getTranslations",
  //   async () =>
  //     await pb
  //       .collection("translations")
  //       .getFirstListItem(`day='${dayNumber}'` && `profile='1urs7uguurwwzf7'`, {
  //         $autoCancel: false,
  //       })
  // );

  return (
    <div>
      <DayPage />
    </div>
  );
}
