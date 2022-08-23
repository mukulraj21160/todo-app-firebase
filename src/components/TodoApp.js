import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../Firebase";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  main: {
    display: "grid",
    justifyContent: "center",
  },
}));

const TodoApp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerInformation, setRegisterInformation] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/homepage");
      }
    });
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/homepage");
      })
      .catch((err) => alert(err.message));
  };

  const handleRegister = () => {
    createUserWithEmailAndPassword(
      auth,
      registerInformation.email,
      registerInformation.password
    )
      .then(() => {
        navigate("/homepage");
      })
      .catch((err) => alert(err.message));
  };
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <h1 style={{ display: "flex", justifyContent: "center", color: "white" }}>
        Todo-App
      </h1>
      {isRegistering ? (
        <div>
          <div>
            <Input
              inputProps={{ "aria-label": "description" }}
              type="email"
              placeholder="Email"
              value={registerInformation.email}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  email: e.target.value,
                })
              }
              sx={{ color: "white" }}
            />
          </div>
          <div>
            <Input
              inputProps={{ "aria-label": "description" }}
              type="password"
              placeholder="Password"
              value={registerInformation.password}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  password: e.target.value,
                })
              }
              sx={{ color: "white" }}
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <Button
              style={{
                fontSize: "10px",
                marginTop: "5px",
              }}
              variant="contained"
              color="primary"
              onClick={handleRegister}
            >
              Register
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <Input
              inputProps={{ "aria-label": "description" }}
              type="email"
              placeholder="Email"
              onChange={handleEmailChange}
              value={email}
              sx={{ color: "white" }}
            />
          </div>
          <div>
            <Input
              inputProps={{ "aria-label": "description" }}
              type="password"
              onChange={handlePasswordChange}
              value={password}
              placeholder="Password"
              sx={{ color: "white" }}
            />
          </div>
          <div
            style={{
              textAlign: "center",
            }}
          >
            <Button
              style={{
                fontSize: "10px",
                marginTop: "5px",
              }}
              variant="contained"
              color="success"
              onClick={handleSignIn}
            >
              Sign In
            </Button>
          </div>
          <div>
            <Button
              style={{ fontSize: "10px", marginTop: "5px" }}
              variant="contained"
              color="secondary"
              onClick={() => setIsRegistering(true)}
            >
              Not Registered? Sign Up
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoApp;
