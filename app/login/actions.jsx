"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";
import { toast } from "react-hot-toast";

export async function login(formData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    // if (error.__isAuthError == true) {
    //   console.log("auth error");
    // }
    throw new Error(error);
  } else {
    revalidatePath("/", "layout");
    redirect("/bar-chart");
  }
}

export async function signup(formData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    throw new Error(error)
    // redirect("/error");
  } else {
    revalidatePath("/", "layout");
    redirect("/log-data");
  }
}
