import React, { useEffect } from "react";
import useStyles from "./style.js";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@material-ui/core";
import moment from "moment";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useDispatch } from "react-redux";

import { deletePost, likePost } from "../../../actions/posts";
import { ThumbUpAltOutlined } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("Profile"));

  const openPost = () =>navigate(`/posts/${post._id}`);

  const Likes = () => {
    if (post?.likeCount?.length > 0) {
      return post?.likeCount?.find(
        (like) => like === (user?.SubInfo || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {post?.likeCount?.length > 2
            ? `You and ${post?.likeCount?.length - 1} others`
            : `${post?.likeCount?.length} like${
                post?.likeCount?.length > 1 ? "s" : ""
              }`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{post?.likeCount?.length}{" "}
          {post?.likeCount?.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };
  return (
    <>
      <Card className={classes.card} raised elevation={6}>
        
          <CardMedia
            className={classes.media}
            image={
              post?.selectedFile ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_AVEacLt1D97Zu0Tr-UXjtOKMYtiS6gWhlg&usqp=CAU"
            }
            alt="banner"
            title={post?.title}
          />
          <div className={classes.overlay}>
            <Typography variant="h6">{post?.name}</Typography>
            <Typography variant="body2">
              {moment(post?.cretedAt).fromNow()}
            </Typography>
          </div>

          <div className={classes.overlay2}>
            {(user?.result?._id === post?.creator ||
              user?.SubInfo === post?.creator) && (
              <Button
                style={{ color: "white" }}
                size="small"
                onClick={() => {
                  setCurrentId(post?._id);
                }}
              >
                <MoreHorizIcon fontSize="medium" />
              </Button>
            )}
          </div>

          <div className={classes.details}>
            <Typography variant="body2" color="textSecondary" component="h2">
              {post?.tags?.map((tag, index) => (
                <span key={index}>{`#${tag} `}</span>
              ))}
            </Typography>
          </div>
          <ButtonBase onClick={openPost} className={classes.cardActions}>
          <Typography className={classes.title} variant="h5" gutterBottom>
            {post?.title}
          </Typography>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {post?.message}
            </Typography>
          </CardContent>
        </ButtonBase>
        <CardActions className={classes.cardActionsbtn}>
          <Button
            size="small"
            color="primary"
            disabled={!user}
            onClick={() => {
              dispatch(likePost(post?._id));
            }}
          >
            <Likes />
            {/* <ThumbUpAltIcon fontSize="small" />
            &nbsp; Like &nbsp;
            {post?.likeCount.length > 0 && post?.likeCount.length} */}
          </Button>
          {(user?.result?._id === post?.creator ||
            user?.SubInfo === post?.creator) && (
            <Button
              size="small"
              color="primary"
              onClick={() => {
                dispatch(deletePost(post?._id));
              }}
            >
              <DeleteIcon fontSize="small" />
              Delete
            </Button>
          )}
        </CardActions>
      </Card>
    </>
  );
};

export default Post;
