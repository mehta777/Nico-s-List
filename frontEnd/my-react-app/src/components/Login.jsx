import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { httpFile } from "../../config/axiosConfig";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const adminInfo = JSON.parse(localStorage.getItem("adminProfile"));
  const [data, setData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const login = () => {
    httpFile
      .post("/login", data)
      .then((res) => {
        const adminProfile = res.data.body;
        localStorage.setItem("adminProfile", JSON.stringify(adminProfile));

        // if (adminProfile.role === 0) {
        navigate("/dashboard");
        toast.success("User Login Successfully");
        // }
      })
      .catch((err) => {
        var errorMessage =
          err.response?.data?.message || "Please fill this filed";
        if (errorMessage === "Please Login First") {
          localStorage.clear();
          navigate("/");
        }

        setError(errorMessage);
      });
  };

  useEffect(() => {
    if (adminInfo) {
      navigate("/dashboard");
    }
  }, [adminInfo, navigate]);

  return (
    <section className="section">
      <div className="d-flex flex-wrap align-items-stretch">
        <div className="col-lg-4 col-md-6 col-12 order-lg-1 min-vh-100 order-2 bg-white mx-auto">
          <div className="p-4 m-3">
            <div className="text-center">
              <img
                src="/assets/limitless.png"
                alt="logo"
                className="mb-5 mt-2"
                style={{
                  width: "140px",
                  borderRadius: "10px",
                  height: "140px",
                }}
              />
            </div>

            <div className="user_form">
              <div className="form-group">
                <label className="mt-0" htmlFor="email">
                  Email
                </label>
                <div className="form_group">
                  <i className="fa-solid fa-user"></i>
                  <input
                    id="email"
                    type="email"
                    className={`form-control ${
                      error && !data.email && "is-invalid"
                    }`}
                    name="email"
                    value={data?.email}
                    onChange={handleChange}
                    tabIndex="1"
                    required=""
                    autoFocus=""
                  />
                </div>
                <div className="invalid-feedback">
                  {error === "Email is required"
                    ? error
                    : "Please fill in your email"}
                </div>
              </div>

              <div className="form-group" style={{ position: "relative" }}>
                <div className="d-block">
                  <label htmlFor="password" className="mt-0">
                    Password
                  </label>
                </div>
                <div className="form_group">
                  <i className="fa-solid fa-lock"></i>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className={`form-control ${
                      error && !data.password && "is-invalid"
                    }`}
                    name="password"
                    value={data?.password}
                    onChange={handleChange}
                    tabIndex="2"
                    required=""
                  />
                </div>
                <i
                  onClick={togglePasswordVisibility}
                  className={
                    showPassword
                      ? "fa fa-eye customClass"
                      : "fa fa-eye-slash customClass"
                  }
                  aria-hidden="true"
                ></i>
                <div className="invalid-feedback">
                  {error === "Password is required"
                    ? error
                    : "Please fill in your password"}
                </div>
              </div>

              <div className="form-group text-right">
                <button
                  onClick={login}
                  type="submit"
                  className="btn btn-primary btn-lg btn-icon icon-right w-100"
                  tabIndex="4"
                >
                  Login
                </button>
              </div>

              {error && <div className="text-danger mt-3">{error}</div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
