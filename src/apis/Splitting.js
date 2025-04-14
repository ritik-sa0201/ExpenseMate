import supabase from "../../utils/supabase";
import { friend_payment } from "./friendpayment";

export async function addBill({ data }) {
  const user = await supabase.auth.getUser();
  const userId = user.data.user.id;

  const participants = data.include
    ? data.Friends.length + 1
    : data.Friends.length;
  const splitAmount = data.amount / participants;

  // Insert the bill
  const { data: Billdata, error } = await supabase.from("split_bills").insert([
    {
      title: data.title,
      amount: data.amount,
      date: data.date,
      category: data.category,
      autoadd: data.autoadd,
      reoccuring: data.reoccuring,
      Friends: data.Friends,
      type: data.type,
      paidby: data.paidby,
      payment_method: data.paymentmethod,
      uuid: userId,
    },
  ]);

  // Now add payment records for each friend (if user paid)

  const friendData = {
    title: data.title,
    amount: splitAmount,
    whoPaid: data.paidby === userId ? "TRUE" : "FALSE",
    when: data.date,
  };

  for (const friendUuid of data.Friends) {
    const { data: friendshipRow, error: fetchError } = await supabase
      .from("friends")
      .select("id")
      .eq("friend_one", userId)
      .eq("friend_two", friendUuid)
      .single();

    if (fetchError) {
      console.error("Error finding friendship:", fetchError);
      continue;
    }

    const friendshipId = friendshipRow.id;

    // Call your custom payment function
    const { error: friendPaymentError } = await friend_payment({
      data: friendData,
      friend: { id: friendshipId, friend_details: { uuid: friendUuid } },
    });

    if (friendPaymentError) {
      console.error("Error adding friend payment:", friendPaymentError);
    }
  }

  return { data: Billdata, error };
}
