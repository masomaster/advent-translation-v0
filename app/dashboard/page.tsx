import HomePage from "./dashboard-client.jsx";
import { getNumOfDays } from "../../lib/days";

export default async function Page() {
  // Fetch data directly in Server Component
  const numOfDays = getNumOfDays();

  // Forward fetched data to Client Component
  return <HomePage numOfDays={numOfDays} />;
}
