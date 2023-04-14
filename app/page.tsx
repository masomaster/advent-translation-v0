import HomePage from "./home-page";
import { getNumOfDays } from "../lib/days";

async function getProfile() {
  const res = await fetch(
    "http://127.0.0.1:8090/api/collections/profiles/records/1urs7uguurwwzf7"
  );
  const data = await res.json();
  return data;
}

export default async function Page() {
  // Fetch data directly in Server Component
  const numOfDays = getNumOfDays();
  const profileData = await getProfile();
  console.log({ profileData });
  // Forward fetched data to Client Component
  return <HomePage numOfDays={numOfDays} profile={profileData} />;
}
