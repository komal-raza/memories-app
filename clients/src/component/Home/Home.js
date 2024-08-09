import React, { useEffect, useState } from "react";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import { useDispatch } from "react-redux"; //dispatch an action
import { getPosts, getSearchPost } from "../../actions/posts";
import Posts from "../posts/Posts";
import Form from "../form/Form";
import { useLocation, useNavigate } from "react-router-dom";
import useStyles from "./styles";
import Paginate from "../Pagination";

import Chip from "@material-ui/core/Chip";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [currentId, setCurrentId] = useState(null);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const query = useQuery();

  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  useEffect(() => {
    //dispatch here is to use dispatch an actions

    dispatch(getPosts());
  }, [currentId, dispatch]);
console.log(currentId);

  const handleSerachKeyPress = (e) => {
    if (e.keyCode === 13) {
      //Code of Enter key
      handleSearch();
    }
  };
  const handleAddTag = (tags) => {
    setTags([...tags, tags]);
  };
  const handleTagDelete = (deletetags) => {
    setTags(tags?.filter((tag) => tag === deletetags));
  };
  const handleSearch = () => {
    if (search.trim() || tags) {
      dispatch(getSearchPost({ search })); //, tags: tags?.join(',')
      navigate(`/posts/search?searchQuery=${search || "none"}`);  //&tags=${tags?.join(',') || "none"}
    } else {
      navigate("/");
    }
  };
  return (
    <>
      <Grow in>
        <Container maxWidth="xl">
          <Grid
            className={classes.gridContainer}
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            {/* //12 spaces on xsmall device and 7 spaces on small devices */}
            <Grid item xs={12} sm={6} md={9}>
              <AppBar
                className={classes.appBarSearch}
                position="static"
                color="inherit"
              >
                <TextField
                  name="search"
                  variant="outlined"
                  label="Search Memories"
                  fullWidth
                  onKeyPress={handleSerachKeyPress}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />

                {/* <TextField
                  variant="outlined"
                  size="small"
                  label="Search tags"
                  onDelete={handleTagDelete}
                  color="primary"
                  style={{ margin: "20px 0" }}
                  value={tags}
                  onChange={handleAddTag}
                /> */}

                <Button
                  onClick={handleSearch}
                  variant="contained"
                  color="primary"
                  className={classes.searchButton}
                >
                  Search
                </Button>
              </AppBar>

            
              <Posts setCurrentId={setCurrentId} />

              {/* <Paper className={classes.pagination} elevation={6}>
                <Paginate className={classes.pagination} />
              </Paper> */}
              {!searchQuery && (
                <Paper
                  style={{ marginBottom: "1.5rem", alignItems: "center" }}
                  elevation={6}
                >
                  <Paginate className={classes.pagination} page={page} />
                </Paper>
              )} 
            </Grid>
            {/* //12 spaces on xsmall device and 4 spaces on small devices */}
            <Grid item xs={12} sm={6} md={3}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </>
  );
};

export default Home;
