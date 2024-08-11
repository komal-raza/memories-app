import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbars from "./component/navbar/Navbars";
import Home from "./component/Home/Home";
import Auth from "./component/auth/Auth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import PostDetails from "./component/postDetails/PostDetails";
function App() {
  const user = JSON.parse(localStorage.getItem("Profile"));

  const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  return (
    <>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <Container maxWidth="xl">
          <BrowserRouter>
            <Navbars />
            <Routes>
              <Route path="/" element={<Navigate replace to="/posts" />} />
              <Route path="/posts" element={<Home />} />
              <Route path="/posts/search" element={<Home />} />
              <Route path="/posts/:id" element={<PostDetails />} />
              <Route
                path="/auth"
                element={!user ? <Auth /> : <Navigate replace to="/posts" />}
              />
              {/* <Route path="/auth" element={()=> (!user ? <Auth />: <Navigate to="/posts" />)} /> */}
            </Routes>
          </BrowserRouter>
        </Container>
      </GoogleOAuthProvider>
      ;
    </>
  );
}

export default App;

/*
const classes = useStyles();
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Container maxWidth='lg'>
      <AppBar className={classes.appBar} position='static' color="inherit">
        <Typography className={classes.heading} varint="h2" align='center'>
            Memorable Moments
        </Typography>

        <img className={classes.image}
        src={memorie} alt="memory"  height={60} />
      </AppBar>

      <Grow in>
        <Container>
          <Grid container justifyContent='space-between' alignItems='stretch' spacing={3} >
            <Grid item xs={12} sm={7}>
              <Posts />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );

*/
