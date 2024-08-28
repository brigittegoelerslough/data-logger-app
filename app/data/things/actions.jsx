"use server";
import { createClient } from "@/app/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function saveThing(formData) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  if (!user) {
    throw Error("Must be an authenticated user to perform this action");
  }
  // redirect('/login')}

  formData["user_id"] = user.id;
  try {
    const { data, error } = await supabase.from("things").insert([formData]);
    if (error) throw error;
    revalidatePath("/saved-data");
    revalidatePath("/log-data");
    redirect("/log-data");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteThing(thingId) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user) {
    throw Error("Must be an authenticated user to perform this action");
  }
  try {
    const { data, error } = await supabase
      .from("things")
      .delete()
      .match({ id: thingId, user_id: user.id });
    if (error) throw error;
    revalidatePath("/saved-data");
    return data;
  } catch (error) {
    throw error;
  }
}
