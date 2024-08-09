import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Avatar } from "@material-ui/core";
import useStyles from "./styles";
import memorie from "../../images/memorie.png";
import { Link, useNavigate } from "react-router-dom";

import { googleLogout } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../constants/actionTypes";
import jwtDecode from "jwt-decode";

const Navbars = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("Profile")));




  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem("Profile")));
  }, [navigate]);

  const logout = () => {
    dispatch({ type: LOGOUT });
    navigate("/");
    setUser(null);
    
   
  };
  return (
    <>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
          <Typography
            className={classes.heading}
            variant="h4"
            align="center"
            component={Link}
            to="/"
          >
            Memories
          </Typography>

          <img
            className={classes.image}
            src={memorie}
            alt="memory_logo"
            height="60"
          />
        </div>

        <Toolbar className={classes.toolbar}>
          {user ? (
            <div className={classes.profile}>
              {/* <Avatar className={classes.purple} alt={user?.result?.name ||user?.name} src={user?.ProfilePic || "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60 "}></Avatar>  */}
              <Avatar
                className={classes.purple}
                src={
                  user?.ProfilePic ||
                  "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                }
                alt={user?.name || user?.result?.name}
              >
                {" "}
                {user?.result?.name?.charAt(0) || user?.name?.charAt(0)}
                {/* {user?.name || user?.result?.name} */}
              </Avatar>
              <Typography className={classes.userName} variant="h6">
                {" "}
                {user?.name || user?.result?.name}
              </Typography>

              <Button
                className={classes.logout}
                color="secondary"
                variant="contained"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              className={classes.login}
              color="primary"
              variant="contained"
              component={Link}
              to="/auth"
            >
              Sign in
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbars;
