// 'use client';
import { displayDay, displayMonth } from "../../app/functions/actions";
import { logout } from "../../app/logout/actions";
import { createClient } from "../../app/utils/supabase/server";

export default async function UserProfile() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (data.user) {
    // console.log(data.user)
    // console.log(data.user.email)
    var email = data.user.email;
  }
  const { data: userData } = await supabase.auth.getUser();
  // console.log(data)
  // console.log('TEST1',data.user,'2')
  // console.log('TEST1',userData.user,'2')
  let things = [];
  if (userData.user == null) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white -pt-20">
        <h1 className="text-2xl font-bold mb-4">To See User Profile:</h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2">
          <a href="/login"> Login/Signup</a>
        </button>
      </main>
    );
  }
  if (userData.user) {
    const { data: thingsData, error } = await supabase
      .from("things")
      .select("*");
    if (error) {
      console.error("Error fetching things:", error);
    }
    things = thingsData;
  }
  if (!things.length) {
    var minDateStr = "none";
    var maxDateStr = "none";
  }

  var num_entries = things.length;

  const dates = [];
  for (var key in things) {
    var item = things[key];
    var day = new Date(item["created_at"]);
    dates.push(day);
  }

  const minimumDate = new Date(Math.min.apply(null, dates));
  var minDateStr = displayDay(minimumDate);

  const maximumDate = new Date(Math.max.apply(null, dates));
  var maxDateStr = displayDay(maximumDate);

  return (
    <main className="min-h-screen flex flex-col bg-gray-800 text-white p-10">
      <div>
        <ul
          className="text-xl md:text-2xl leading-loose"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <li className="flex items-center">
            <p className="font-bold ">Email: </p> {"\xa0"} {"\xa0"}{" "}
            <p className="font-light">{email}</p>
          </li>
          <li className="flex items-center">
            <p className="font-bold ">First Entry: </p> {"\xa0"} {"\xa0"}{" "}
            <p className="font-light">{minDateStr}</p>
          </li>
          <li className="flex items-center">
            <p className="font-bold ">Last Entry: </p> {"\xa0"} {"\xa0"}{" "}
            <p className="font-light">{maxDateStr}</p>
          </li>
          <li className="flex items-center">
            <p className="font-bold ">Number of Entries: </p> {"\xa0"} {"\xa0"}{" "}
            <p className="font-light">{num_entries}</p>
          </li>
          {/* <li>
                Change Password
            </li> */}
        </ul>
      </div>
    </main>
  );
}
