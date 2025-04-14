import supabase from "../../utils/supabase";

export async function CreateNewUser(user) {
  const { data, error } = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
    options: {
      data: {
        name: user.name,
      },
    },
  });
  return { data, error };
}

export async function SignInUser(user) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: user.password,
  });

  return { data, error };
}

export async function SignOutUser() {
  const { error } = await supabase.auth.signOut();
  return { error };
}
