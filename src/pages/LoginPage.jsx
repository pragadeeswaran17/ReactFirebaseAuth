import React, { useState } from "react";
import "./loginPage.css";
import { LogInApi } from "../services/api";
import { storeUserDate } from "../services/storage";
import { isAuthendicated } from "../services/auth";
import { Link, Navigate } from "react-router-dom";
import NavBar from "../Components/NavBar";

const LoginPage = () => {
  const initialStateErrors = {
    email: { required: false },
    password: { required: false },
    customError: null,
  };

  const [errors, setErrors] = useState(initialStateErrors);

  const [isLoading, setIsLoading] = useState(false);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleInputs = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let error = initialStateErrors;
    let hasError = false;
    if (inputs.email === "") {
      error.email.required = true;
      hasError = true;
    }
    if (inputs.password === "") {
      error.password.required = true;
      hasError = true;
    }

    if (!hasError) {
      setIsLoading(true);
      //sending api request
      LogInApi(inputs)
        .then((response) => {
          storeUserDate(response.data.idToken);
        })
        .catch((err) => {
          // catch logIn errors
          console.log(err);
          if (err.code === "ERR_BAD_REQUEST") {
            setErrors((errors) => ({
              ...errors,
              customError: "Invalid Credentials.",
            }));
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    setErrors({ ...error });
  };

  if (isAuthendicated()) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <NavBar />
      <section className="login-block">
        <div className="container">
          <div className="row ">
            <div className="col login-sec">
              <h2 className="text-center">Login Now</h2>
              <form onSubmit={handleSubmit} className="login-form" action="">
                <div className="form-group">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="text-uppercase"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id=""
                    placeholder="email"
                    onChange={handleInputs}
                  />
                  {errors.email.required ? (
                    <span className="text-danger">Email is required.</span>
                  ) : null}
                </div>
                <div className="form-group">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="text-uppercase"
                  >
                    Password
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    placeholder="password"
                    id=""
                    onChange={handleInputs}
                  />
                  {errors.password.required ? (
                    <span className="text-danger">Password is required.</span>
                  ) : null}
                </div>
                <div className="form-group">
                  {isLoading ? (
                    <div className="text-center">
                      <div
                        className="spinner-border text-primary "
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  ) : null}
                  <span className="text-danger">
                    {errors.customError ? <p>{errors.customError}</p> : null}
                  </span>
                  <input
                    type="submit"
                    className="btn btn-login float-right"
                    value="Login"
                    disabled={isLoading}
                  />
                </div>
                <div className="clearfix"></div>
                <div className="form-group">
                  Create new account ? Please{" "}
                  <Link to="/register">Register</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
