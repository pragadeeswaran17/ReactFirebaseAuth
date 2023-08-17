import React, { useEffect, useState } from "react";
import { UserDetailsApi } from "../services/api";
import NavBar from "../Components/NavBar";
import { isAuthendicated, logOut } from "../services/auth";
import { Navigate, useNavigate } from "react-router-dom";

const DashBoardPage = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    localId: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthendicated()) {
      UserDetailsApi().then((response) => {
        console.log(response);
        setUser({
          name: response.data.users[0].displayName,
          email: response.data.users[0].email,
          localId: response.data.users[0].localId,
        });
      });
    }
  }, []);

  const logOutUser = () => {
    logOut();
    navigate("/login");
  };

  if (!isAuthendicated()) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <NavBar logOutUser={logOutUser} />
      <main role="main" className="container mt-7">
        <div className="container">
          <div className="text-center mt-5">
            <h3>Dashboard page</h3>
            {user.name && user.email && user.localId ? (
              <div>
                <p className="text-bold ">
                  Hi {user.name}, your Firebase ID is {user.localId}
                </p>
                <p>Your email is {user.email}</p>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default DashBoardPage;
