"use client";
import { useState } from "react";
import { login, resetPasswordFx, signup } from "./actions";
import { createClient } from "../utils/supabase/client";
import { redirect } from "next/navigation";
import { toast } from "react-hot-toast";

export default function Login() {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [clickedSignUp, setClickedSignUp] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function sendResetPassword(formData) {
    const supabase = createClient();
    const fullname = `${window.location.href}`.slice(0, -5);
    var website = fullname + "reset-password";
    try {
      const email = formData.get("email");
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: website,
      });
      toast.success("Success! Check your email", { duration: 5000 });
    } catch (error) {
      console.log(error);
    }
  }

  async function tryLogin(formData) {
    try {
      await login(formData);
    } catch (error) {
      toast.error("Login failed, please try again.");
    }
  }

  async function trySignUp(formData) {
    try {
      await signup(formData);
    } catch (error) {
      toast.error("Sign up failed, please try again.");
      return;
    }
    toast.success("Sign up link sent! Go confirm your email.");
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white">
      {!resetPassword && (
        <div>
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="sr-only">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email address"
                className="-mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-700 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                placeholder="Password"
                className="-mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-700 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              />
            </div>

            <p
              onClick={() => setShowPassword(!showPassword)}
              className=" w-full flex justify-center text-sm rounded-md text-gray-400 hover:text-blue-400 hover:cursor-pointer"
            >
              Show Password
            </p>

            <div>
              {isSigningUp ? (
                <button
                  type="submit"
                  formAction={trySignUp}
                  onClick={() => setClickedSignUp(true)}
                  className="-mt-2 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Sign up
                </button>
              ) : (
                <button
                  type="submit"
                  formAction={tryLogin}
                  className="-mt-2 group relative w-full flex justify-center py-2 px-4 border border-transparent font-bold text-sm rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Login
                </button>
              )}
            </div>
          </form>

          {!isSigningUp ? (
            <p className="mt-10 text-center text-sm text-gray-400">
              Don't have an account?{" "}
              <button
                className="font-medium text-white hover:text-green-500"
                onClick={() => setIsSigningUp(true)}
              >
                Sign up
              </button>
            </p>
          ) : (
            <p className="mt-10 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <button
                className="font-medium text-white hover:text-blue-500"
                onClick={() => setIsSigningUp(false)}
              >
                Login
              </button>
            </p>
          )}
        </div>
      )}

      {resetPassword && (
        <form>
          <div>
            <label htmlFor="email" className="sr-only">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Email Address"
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            className="mt-4 mb-5 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            formAction={sendResetPassword}
          >
            Reset Password
          </button>
        </form>
      )}

      <p className="mt-3.5 text-center text-sm text-gray-400">
        {resetPassword ? "Remember your Password?" : "Forgot your Password?"}{" "}
        <button
          className={
            resetPassword
              ? "font-medium text-white hover:text-blue-500"
              : "font-medium text-white hover:text-red-500"
          }
          onClick={() => setResetPassword(!resetPassword)}
        >
          {resetPassword ? "Login" : "Reset Password"}
        </button>
      </p>
    </main>
  );
}
