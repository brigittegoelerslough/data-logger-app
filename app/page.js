import Image from "next/image";
import { createClient } from "./utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    return (
      <main className="bg-gray-800 min-h-screen flex items-center justify-center text-center text-white p-5">
        <div>
          <h1 className="text-4xl font-bold mb-12 -mt-24"> Data Logger App </h1>
          <h1 className="text-2xl mb-16">
            {" "}
            To log data for whatever you want to track, and to see graphs over
            time{" "}
          </h1>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-800 min-h-screen flex items-center justify-center text-center text-white p-5">
      <div>
        <h1 className="text-4xl font-bold mb-12 "> Data Logger App </h1>
        <h1 className="text-2xl mb-16">
          {" "}
          To log data for whatever you want to track, and to see graphs over
          time:{" "}
        </h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2 mb-32">
          <a href="/login"> Login/Signup</a>
        </button>
      </div>
    </main>
  );
}
