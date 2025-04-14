import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import FormLogin from "./FormLogin";
import HomeBox from "./HomeBox";
import HomeBox2 from "./HomeBox2";
import HomeBox3 from "./HomeBox3";

import { ToggleLogin } from "../../slices/Loginreducer";
import FormSignUp from "./FormSignup";

function Home() {
  const showSignIn = useSelector((store) => store.UserLogin.showForm);

  const showSignUp = useSelector((store) => store.UserLogin.NewUser);

  const dispatch = useDispatch();
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      dispatch(ToggleLogin());
    }
  };

  return (
    <div className="flex flex-col gap-20 items-center justify-center relative">
      <Header />
      <HomeBox />
      <HomeBox2 />
      <HomeBox3 />
      <Footer />

      {/* Overlay for FormLogin */}
      {showSignIn && (
        <div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/30 backdrop-blur-sm z-50"
          onClick={handleOverlayClick}
        >
          {showSignUp ? <FormSignUp /> : <FormLogin />}
        </div>
      )}
    </div>
  );
}

export default Home;
