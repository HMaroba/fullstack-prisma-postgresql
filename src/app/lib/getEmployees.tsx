import { unstable_noStore as noStore } from "next/cache";

export async function getData() {
  noStore();
  const res = await fetch("http://localhost:3001/api/v1/auth/employee/");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
