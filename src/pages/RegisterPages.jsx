import React, { useState } from "react";
import "./registerpage.css";
import { RegisterApi } from "../services/api";
import { storeUserDate } from "../services/storage";
import { isAuthendicated } from "../services/auth";
import { Link, Navigate } from "react-router-dom";
import NavBar from "../Components/NavBar";

const RegisterPages = () => {
  const initialStateErrors = {
    email: { required: false },
    password: { required: false },
    name: { required: false },
    customError: null,
  };

  const [errors, setErrors] = useState(initialStateErrors);

  const [isLoading, setIsLoading] = useState(false);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleSubmit = (event) => {
    console.log(inputs);
    event.preventDefault();
    let error = initialStateErrors;
    let hasError = false;
    if (inputs.name === "") {
      error.name.required = true;
      hasError = true;
    }
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
      RegisterApi(inputs)
        .then((response) => {
          storeUserDate(response.data.idToken);
        })
        .catch((err) => {
          if (err.response.data.error.message === "EMAIL_EXISTS") {
            setErrors((errors) => ({
              ...errors,
              customError: "Already this email has been register!",
            }));
          } else if (
            String(err.response.data.error.message).includes("WEAK_PASSWORD")
          ) {
            setErrors((errors) => ({
              ...errors,
              customError: "Password should be at least 6 characters",
            }));
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    setErrors({ ...error });
  };

  const handleInputs = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  if (isAuthendicated()) {
    //tru or false
    //redirect to dashboard
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <NavBar />
      <section className="register-block">
        <div className="container">
          <div className="row ">
            <div className="col register-sec">
              <h2 className="text-center">Register Now</h2>
              <form onSubmit={handleSubmit} className="register-form" action="">
                <div className="form-group">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="text-uppercase"
                  >
                    Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id=""
                    onChange={handleInputs}
                  />
                  {errors.name.required ? (
                    <span className="text-danger">Name is required.</span>
                  ) : null}
                </div>
                <div className="form-group">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="text-uppercase"
                  >
                    Email
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    id=""
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
                    id=""
                    onChange={handleInputs}
                  />
                  {errors.password.required ? (
                    <span className="text-danger">Password is required.</span>
                  ) : null}
                </div>
                <div className="form-group">
                  <span className="text-danger">
                    {errors.customError ? <p>{errors.customError}</p> : null}
                  </span>
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

                  <input
                    type="submit"
                    className="btn btn-login float-right"
                    value="Register"
                    disabled={isLoading}
                  />
                </div>
                <div className="clearfix"></div>
                <div className="form-group">
                  Already have account ? Please <Link to="/login">LogIn</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterPages;
