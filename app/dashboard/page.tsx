import HomePage from "./dashboard-client";
import { getNumOfDays } from "../../lib/days";
import getDocument from "../../firebase/firestore/getData";
import firebase_app from "../../firebase/config";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default async function Page() {
  // Fetch data directly in Server Component
  const numOfDays = getNumOfDays();

  // Forward fetched data to Client Component
  return <HomePage numOfDays={numOfDays} />;
}
