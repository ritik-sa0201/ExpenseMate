import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import supabase from "./supabase";

function LockedRoutes({ children }) {
  const [user, setUser] = useState(undefined); // Initial state undefined to prevent flashing

  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error(error);
        setUser(null); // Treat errors as logged-out state
      } else {
        setUser(data?.session?.user || null); // Ensure null if no session
      }
    }
    fetchUser();
  }, []);

  if (user === undefined) return null; // Prevent flashing during initial check

  if (user) return <Navigate to="/dashboard" />; // Redirect logged-in users

  return <>{children}</>; // Allow access to homepage if not logged in
}

export default LockedRoutes;
