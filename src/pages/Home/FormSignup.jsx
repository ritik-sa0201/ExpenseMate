import { LuEye, LuEyeClosed } from "react-icons/lu";
import styles from "./FormSignUp.module.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NewUser } from "../../slices/Loginreducer";
import { CreateNewUser } from "../../apis/authentication";
import Spinner from "react-spinner";
import { SyncLoader } from "react-spinners";

function FormSignUp() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await CreateNewUser(user);
    if (error) {
      setError(error);
    } else {
      alert("Verify your email then Please Login");
    }
    setLoading(false);
  }

  const [type, setType] = useState("password");
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(NewUser());
  }

  function handleShow() {
    setType(type === "password" ? "text" : "password");
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
            <h2 className={styles.welcome}>HELLO THERE!!</h2>

            <div className={styles.inputbox}>
              <input
                type="text"
                placeholder="Username"
                name="name"
                value={user.name}
                required
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={styles.inputbox}>
              <input
                type="text"
                placeholder="Email"
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

            {error && <p className="text-red-500">{error.message}</p>}

            <button className={styles.loginbtn} type="submit">
              {loading ? (
                <SyncLoader size="8" color="white" />
              ) : (
                "CREATE ACCOUNT"
              )}
            </button>
          </div>

          <h3 className={styles.signuptext}>
            Already have an account?{" "}
            <span className={styles.signup} onClick={handleClick}>
              Login
            </span>
          </h3>
        </form>
      </div>
    </div>
  );
}

export default FormSignUp;
