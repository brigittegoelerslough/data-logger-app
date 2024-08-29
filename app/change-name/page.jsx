"use client";

import { redirect, useRouter } from "next/navigation";
import { createClient } from "../utils/supabase/client";
import { revalidatePath } from "next/cache";

// import { useRouter } from "next/router";

export function ChangeNameModal() {
  const router = useRouter();

  const supabase = createClient();

  async function confirmName(formData) {
    const data = { display_name: formData.get("name") };

    const { data: resetData, error } = await supabase.auth.updateUser({
      data,
    });

    if (resetData.user) {
      // console.log(resetData);
      router.push("/");
      router.refresh();
    }
    if (error) {
      console.log(error);
    }
  }

  async function closeModal() {
    router.refresh();
    router.push("/");
  }

  return (
    // <div className="relative p-4 w-full h-full max-w-md max-h-full mt-10">
    // <div className="fixed inset-0 bg-gray-600 bg-opacity-30 overflow-y-auto h-full w-full flex justify-center">
    <div className="relative p-4 w-full h-full max-w-md max-h-full mt-10 flex justify-center">
      <div className="rounded-lg shadow bg-gray-700 ring-2 ring-gray-500 ring-offset-2 ring-offset-gray-600">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-500">
          <h3 className="text-xl font-semibold text-white pr-2">
            Change Display Name
          </h3>

          <button
            type="button"
            onClick={closeModal}
            className="-mr-1 text-gray-400 bg-transparent hover:bg-gray-600 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
          >
            <svg class="w-3 h-3" viewBox="0 0 14 14">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>

        <div class="p-4 md:p-5">
          <form class="space-y-4" action="#">
            <div>
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-white text-left"
              >
                Your Name:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="-mb-1 text-center text-sm appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-400 text-white bg-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                placeholder="Name"
                required
              />
            </div>

            <button
              type="submit"
              formAction={confirmName}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
    // <div className="fixed inset-0 bg-gray-600 bg-opacity-30 overflow-y-auto h-full w-full flex justify-center">
    //   <div className="p-8 border border-gray-600 border-4 w-96 h-64 shadow-lg rounded-md bg-gray-800 mt-20">
    //     <button className="flex justify-end -mt-4 text-gray-400 hover:text-red-500">
    //       X
    //     </button>
    //     <div className="text-center">
    //       <form className="space-y-6">
    //         <div>
    //           <h1 className="text-white text-2xl font-bold mb-8">
    //             Change Display Name:
    //           </h1>
    //           <label htmlFor="name" className="sr-only">
    //             Password
    //           </label>
    //           <input
    //             id="name"
    //             name="name"
    //             type="text"
    //             autoComplete="name"
    //             required
    //             placeholder="Name"
    //             className="-mb-1 text-center text-md appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
    //           />
    //         </div>
    //         <button
    //           type="submit"
    //           formAction={confirmName}
    //           className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    //         >
    //           Submit
    //         </button>
    //       </form>
    //     </div>
    //   </div>
    // </div>
  );
}
