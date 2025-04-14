import { useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { SyncLoader } from "react-spinners";
import { SignInUser } from "../../apis/authentication";
import { NewUser } from "../../slices/Loginreducer";
import styles from "./FormLogin.module.css";

function FormLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await SignInUser(user);
    if (error) {
      alert(`${error.message} or user do not exist `);
    } else {
      navigate("/dashboard");
    }
    setLoading(false);
  }

  const [type, setType] = useState("password");
  const dispatch = useDispatch();

  function handleShow() {
    setType(type === "password" ? "text" : "password");
  }

  function handleClick() {
    dispatch(NewUser());
  }

  return (
    <div className={styles.mirror}>
      <div className={styles.mainbox}>
        {/* Left Image Container */}
        <div className={styles.imgcontainer}>
          <img
            src="/home.png"
            alt="Home Illustration"
            className={styles.image}
          />
        </div>

        {/* Right Form Container */}
        <form
          className={styles.formcontainer}
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className={styles.formbox}>
            <h2 className={styles.welcome}>WELCOME BACK!</h2>

            <div className={styles.inputbox}>
              <input
                type="text"
                placeholder="email"
                required
                name="email"
                value={user.email}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className={styles.inputbox}>
              <input
                type={type}
                placeholder="Password"
                required
                name="password"
                value={user.password}
                onChange={(e) => handleChange(e)}
              />
              {type === "password" ? (
                <LuEye color="black" onClick={handleShow} />
              ) : (
                <LuEyeClosed color="black" onClick={handleShow} />
              )}
            </div>

            <button className={styles.loginbtn} type="submit">
              {loading ? <SyncLoader size="8" color="white" /> : "Login"}
            </button>
            <a href="#" className={styles.forgot}>
              Forgot Password?
            </a>
          </div>

          <h3 className={styles.signuptext}>
            Don't have an account?{" "}
            <span className={styles.signup} onClick={handleClick}>
              Sign Up
            </span>
          </h3>
        </form>
      </div>
    </div>
  );
}

export default FormLogin;
