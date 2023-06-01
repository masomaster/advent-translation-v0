import HomePage from "./dashboard-client";
import { getNumOfDays } from "../../lib/days";
import getDocument from "../../firebase/firestore/getData";

async function getProfile() {
  // The Pocketbase solution:
  /* const res = await fetch(
    "http://127.0.0.1:8090/api/collections/profiles/records/1urs7uguurwwzf7"
  );
  const data = await res.json();
  return data; */
  // The Cloud Firestore solution:
  const profile = await getDocument("profiles", "ZoEMHTUnNSY735bW859u");
  // console.log("firebase profile", profile);
  return profile;
}

export default async function Page() {
  // Fetch data directly in Server Component
  const numOfDays = getNumOfDays();
  const profileData = await getProfile();
  // console.log("profileData from firestore", profileData);
  // Forward fetched data to Client Component
  return <HomePage numOfDays={numOfDays} profile={profileData} />;
}
