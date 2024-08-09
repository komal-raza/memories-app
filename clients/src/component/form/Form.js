import React, { useState, useEffect } from "react";
import useStyles from "./styles.js";
import FileBase64 from "react-file-base64";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { createPost, getPosts, updatePost } from "../../actions/posts";

// Get the current ID of Post for Update post
const Form = ({ currentId, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("Profile"));

  // PostData hooks
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const classes = useStyles();
  const dispatch = useDispatch();
  // When you need a particular post to update/Edit
  const post = useSelector((state) =>
    currentId //use selector use for fetching all posts
      ? state.posts.find((p) => p._id === currentId)
      : null
  );
  //   //find the post with specific id for update

  // when post change then call this effect to update post
  useEffect(() => {
    if (post) {
      //if post exists then call update method
      setPostData(post);
    }
  }, [post]);

  // Crete a New Post
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Form data", postData);
    dispatch(getPosts());
    if (!currentId) {
      dispatch(createPost({ ...postData, name: user?.name }));
      dispatch(getPosts());

      // window.location.reload(false);
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.name }));
    }
    clearAll();
  };

  // Clear All forms Input
  const clearAll = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };
  console.log("username", user?.result?.name, user?.name);
  if (!user) {
    //
    console.log("1st return");
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign in to Share your memories with others
        </Typography>
      </Paper>
    );
  } else if (!user) {
    console.log("3rd return");
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign in to Share your memories with others
        </Typography>
      </Paper>
    );
  }
  console.log("3rd return");
  return (
    <>
      <Paper className={classes.paper} elevation={6}>
        <form
          className={`${classes.root} ${classes.form}`}
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
        >
          <Typography variant="h6">
            {currentId ? "Editing" : "Creating"} a memory
          </Typography>
          {/* <TextField
            name="creator"
            variant="outlined"
            label="Creator"
            fullWidth
            value={postData.creator}
            onChange={(e) =>
              setPostData({ ...postData, creator: e.target.value })
            }
          /> */}
          <TextField
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
          <TextField
            name="message"
            variant="outlined"
            label="Message"
            fullWidth
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          />
          <TextField
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onChange={(e) =>
              setPostData({ ...postData, tags: e.target.value.split(",") })
            }
          />
          <div className={classes.fileInput}>
            {/* OnDone we destructure the data and get base64 */}
            <FileBase64
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
          </div>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
          <Button
            className={classes.buttonClear}
            variant="contained"
            color="secondary"
            size="small"
            fullWidth
            onClick={clearAll}
          >
            Clear
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default Form;
