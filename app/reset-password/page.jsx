"use client";
import { useState } from "react";
import { createClient } from "../utils/supabase/client";
import { redirect } from "next/navigation";
import { toast } from "react-hot-toast";

export default function Reset() {
  const supabase = createClient();

  const [showPassword, setShowPassword] = useState(false);

  async function confirmPasswords(formData) {
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");
    if (password != confirmPassword) {
      toast.error("Your passwords must be the same", { duration: 4000 });
      return false;
    }
    const { data: resetData, error } = await supabase.auth.updateUser({
      password: password,
    });

    if (resetData.user) {
      console.log(resetData);
      redirect("/login");
    }
    if (error) {
      console.log(error);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white">
      <div>
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="password"
              required
              placeholder="Password"
              className="-mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-700 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              name="confirm-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              placeholder="Confirm Password"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-700 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            formAction={confirmPasswords}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Confirm
          </button>
        </form>

        <button
          onClick={() => setShowPassword(!showPassword)}
          className="mt-3 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-400 bg-transparent hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Show Passwords
        </button>
      </div>
    </main>
  );
}
