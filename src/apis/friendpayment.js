import supabase from "../../utils/supabase";

export async function friend_payment({ data, friend }) {
  const friendshipId = friend.id;
  const user_id = await supabase.auth.getUser().then((res) => res.data.user.id);
  const friendId = friend.friend_details.uuid;

  // Insert the payment for the current friendship
  const { data: paymentData, error: paymentError } = await supabase
    .from("friend_payment")
    .insert([
      {
        title: data.title,
        amount: data.amount,
        when: data.when,
        paid_by: data.whoPaid,
        friendship_id: friendshipId,
      },
    ]);

  if (paymentError) {
    return { data: null, error: paymentError };
  }

  // Check for the reciprocal friendship
  const { data: reciprocalFriendship, error: reciprocalError } = await supabase
    .from("friends")
    .select("id")
    .eq("friend_one", friendId)
    .eq("friend_two", user_id)
    .single();

  if (reciprocalError && reciprocalError.code !== "PGRST116") {
    // Handle errors other than "No rows found"
    return { data: null, error: reciprocalError };
  }

  if (reciprocalFriendship) {
    // Insert the payment for the reciprocal friendship
    const { error: reciprocalPaymentError } = await supabase
      .from("friend_payment")
      .insert([
        {
          title: data.title,
          amount: data.amount,
          when: data.when,
          paid_by: !data.whoPaid,
          friendship_id: reciprocalFriendship.id,
        },
      ]);

    if (reciprocalPaymentError) {
      return { data: null, error: reciprocalPaymentError };
    }
  }

  return { data: paymentData, error: null };
}

export async function getHistory(friendshipId) {
  const { data, error } = await supabase
    .from("friend_payment")
    .select("*")
    .eq("friendship_id", friendshipId);

  return { data, error };
}

export async function DeletePayment(id) {
  const { data, error } = await supabase
    .from("friend_payment")
    .delete()
    .eq("id", id);

  return { data, error };
}
