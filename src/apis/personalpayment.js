import supabase from "../../utils/supabase";
export async function addPayment(formData) {
  try {
    const { data, error } = await supabase
      .from("personal_payment")
      .insert([formData])
      .select();

    if (error) {
      console.error("Supabase Error:", error);
      throw new Error(error.message);
    }

    return { data };
  } catch (error) {
    console.error("Error adding payment:", error.message);
    return { error: error.message };
  }
}

export async function getUserPayment() {
  const { data, error } = await supabase.from("personal_payment").select("*");

  return { data, error };
}

export async function DeletePayment(id) {
  const { data, error } = await supabase
    .from("personal_payment")
    .delete()
    .eq("id", id)
    .select();

  return { data, error };
}
