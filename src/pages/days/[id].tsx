import { getDayData } from "../../../lib/days";

export async function getStaticProps({ params }: { params: { id: number } }) {
  const dayData = await getDayData(params.id);
  return {
    props: {
      dayData,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
}

export default function Day({ dayData }: { dayData: any }) {
  return (
    <div>
      <h1>Day {dayData.dayNumber}</h1>
      <p>
        Hebrew: <span className="hebrew">{dayData.hebrew}</span> from{" "}
        {dayData.hebrewVerse}
      </p>
      <p>
        Greek: <span className="greek">{dayData.greek}</span> from{" "}
        {dayData.greekVerse}
      </p>
    </div>
  );
}
