import supabase from "../../utils/supabase";

export async function AddFriend(data) {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("User not authenticated");
  }

  const userId = user.id;

  // Step 2: Look up friend by email
  const { data: friendUser, error: findError } = await supabase
    .from("users")
    .select("*")
    .eq("email", data.email)
    .single();

  if (findError || !friendUser) {
    throw new Error("User not found");
  }

  const friendId = friendUser.uuid;

  if (friendId === userId) {
    throw new Error("You cannot add yourself as a friend");
  }

  // Step 3: Check if friendship already exists (either direction)
  const { data: existingFriends, error: checkError } = await supabase
    .from("friends")
    .select("*")
    .or(
      `and(friend_one.eq.${userId},friend_two.eq.${friendId}),and(friend_one.eq.${friendId},friend_two.eq.${userId})`
    );

  if (checkError) {
    throw new Error("Error checking existing friendships");
  }

  if (existingFriends.length > 0) {
    throw new Error("You are already friends with this user");
  }

  // Step 4: Insert mutual friendship
  const { error: insertError } = await supabase.from("friends").insert([
    {
      friend_one: userId,
      friend_two: friendId,
    },
    {
      friend_one: friendId,
      friend_two: userId,
    },
  ]);

  if (insertError) {
    throw new Error("Failed to add friend");
  }

  return { data: "Friend added successfully" };
}

export async function getFriends() {
  const user = await supabase.auth.getUser();

  const userId = user.data.user.id; // Get the authenticated user's ID
  if (!user) {
    throw new Error("User not authenticated");
  }
  // Fetch friends of the user
  const { data, error } = await supabase
    .from("friends")
    .select(
      `
      id,
    friend_details:users (
      uuid,
      name,
      email
    )
  `
    )
    .eq("friend_one", userId);

  if (error) {
    throw new Error("Error fetching friends");
  } else {
    return { data };
  }
}

export async function deleteFriend(friendId) {
  const { data, error } = await supabase
    .from("friends")
    .delete()
    .eq("id", friendId);

  return { data, error };
}
