import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import { ToggleLogin } from "../slices/Loginreducer";
import { Button } from "../components/ui/button";
function Header() {
  const showSignIn = useSelector((store) => store.UserLogin.showForm);
  const dispatch = useDispatch();

  function handleClick(e) {
    dispatch(ToggleLogin());
  }
  return (
    <div
      className="min-w-screen h-[60px] backdrop-filter backdrop-blur-[10px]
    shadow-2xl
    "
    >
      <div className="flex items-center justify-between p-4">
        <Link to="/">
          <Logo />
        </Link>
        <Button
          variant="destructive"
          className="cursor-pointer"
          onClick={handleClick}
        >
          {showSignIn ? "Sign Up" : "Sign In"}
        </Button>
      </div>
    </div>
  );
}

export default Header;
