 import React from "react";
import useStyles from "./styles";
import {
  Avatar,
  Paper,
  Grid,
  Button,
  Typography,
  Container,
  TextField,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import Input from "./Input";
import { useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { createOrGetuser, loginUser, signupUser } from "../../actions/auth";
import { AUTH } from "../../constants/actionTypes";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [formData, setFormData] = useState(initialState);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Google Sign In Btn Functionality
  const createOrGetuser = async (response) => {
    const token = response.credential;

    const decoded = jwt_decode(response.credential);

    try {
      const ProfilePic = decoded?.picture;
      const name = decoded?.name;
      const SubInfo = decoded?.sub;

      dispatch({ type: AUTH, data: { ProfilePic, name, SubInfo, token } });
      navigate("/posts");
    } catch (error) {
      console.log(error);
    }
  };
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const switchMode = () => {
    setIsSignUp((prevState) => !prevState);
    handleShowPassword(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSignUp) {
      dispatch(loginUser(formData, navigate));
    } else {
      dispatch(signupUser(formData, navigate));
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  type="text"
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  type="text"
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />{" "}
            {isSignUp && (
              <Input
                name="confirmpassword"
                label="Confirm Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? "Sign Up" : "Sign in"}
          </Button>

          <Grid container justifyContent="center">
            <GoogleLogin
              onSuccess={(response) => {
                createOrGetuser(response);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </Grid>

          <Grid container justifyContent="felx-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? "Already have an account? Sign in"
                  : "Create an Account"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
