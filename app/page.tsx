import HomePage from "./home-page";
import { getNumOfDays } from "../lib/days";

export default async function Page() {
  // Fetch data directly in a Server Component
  const numOfDays = getNumOfDays();
  // Forward fetched data to your Client Component
  return <HomePage numOfDays={numOfDays} />;
}
