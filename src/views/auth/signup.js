import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/auth";
import { toast } from "react-toastify";
import Loader from "../common/loader";

const SignUp = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [loading, setLoading] = useState(false);

  const [confPass, setconfPass] = useState("");
  const [Pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (name && email && confPass && Pass && confPass === Pass) {
      setLoading(true);
      let header = {
        userName: name,
        email: email,
        password: Pass,
        confirmPassword: confPass,
      };
      await register(header)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userId", res.data.data.userId);
          setLoading(false);
          navigate("/");
          window.location.reload();
        })
        .catch((err) => {
          setLoading(false);

          toast.error(`${err.response.data.error}`);
        });
    } else {
      if (!name) {
        toast.warning("Name field is required");
      }
      if (!email) {
        toast.warning("Email field is required");
      }
      if (!Pass) {
        toast.warning("Password field is required");
      }
      if (!confPass) {
        toast.warning("Confirm password field is required");
      }
      if (!(confPass === Pass)) {
        toast.warning("Confirm password and Password field are not equal");
      }
    }
  };

  return (
    <>
      {loading && <Loader />}

      <div className="signin">
        <div className="signin-app-container">
          <h1 className="app-header">Sign Up</h1>
          <div className="info-box">
            <div>
              <div className="label">Name</div>
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  onChange={(e) => setname(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="label">Email</div>
              <div>
                <input
                  type="text"
                  placeholder="Email"
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="label">Password</div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPass(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="label">Confirm Password</div>
              <div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) => setconfPass(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button className="sign-btn" onClick={() => handleRegister()}>
                Sign Up
              </button>
            </div>
          </div>
          <div className="create-acc" onClick={() => navigate("/signin")}>
            Already have an account?
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
