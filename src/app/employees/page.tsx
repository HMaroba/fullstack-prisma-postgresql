
import { getData } from "../lib/getEmployees";

export default async function Page() {
  const data = await getData();
  console.log(data);

  return (
    <main>
      <div>
        <p className="p-10 text-3xl font-semibold">Employees Data Below</p>
        <p>{data.first_name}</p>
      </div>
    </main>
  );
}
