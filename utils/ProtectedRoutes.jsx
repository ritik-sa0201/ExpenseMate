import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./supabase";

function ProtectedRoutes({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error(error);
      } else {
        if (data?.session?.user) {
          setUser(data.session.user);
        } else {
          setUser(null);
          alert("Please Login First");
          navigate("/");
        }
      }
    }
    fetchUser();
  }, [navigate]);

  if (!user) return null;

  return <>{children}</>;
}

export default ProtectedRoutes;
