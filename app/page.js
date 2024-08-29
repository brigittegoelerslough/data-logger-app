import Image from "next/image";
import { createClient } from "./utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ChangeNameModal } from "./change-name/page";

export default async function Home({ searchParams }) {
  const show = searchParams?.show;
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    if (!data.user.user_metadata.display_name) {
      var displayName = data.user.email
    } else {
      displayName = data.user.user_metadata.display_name
    }
    return (
      <main className="bg-gray-800 min-h-screen flex items-center justify-center text-center text-white p-5">
        <div>
          <h1 className={show ? "text-4xl font-bold mb-12 -mt-36" : "text-4xl font-bold mb-16 -mt-64"}> Data Logger App </h1>
          {/* <h1 className="text-4xl font-bold mb-12 -mt-80"> Data Logger App </h1> */}

          {/* <h1 className="text-2xl font-medium mb-12"> */}
          <div className="flex justify-center items-center mb-3">
            <h1 className="text-2xl font-normal">
              Hello, {"\xa0"}
            </h1>
            <h1 className="text-2xl font-bold">
              {displayName}
            </h1>
          </div>
          <h1 className="text-lg mb-12 text-gray-400 font-medium">
            {data.user.email}
          </h1>

          <Link
            href="/?show=true"
            className="-mt-2 justify-center py-2 px-4 text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:ring-1 focus:ring-blue-500"
            >
            Change Display Name
          </Link>

          {show && <ChangeNameModal />}

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
