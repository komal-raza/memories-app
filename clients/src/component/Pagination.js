import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getPosts } from "../actions/posts";
import { useSelector } from "react-redux";

const Paginate = ({ page }) => {
  // console.log("paginate",page)
  const classes = useStyles();
  const dispatch = useDispatch();
  const { numberofPages } = useSelector((state) => state.posts);


  useEffect(() => {
    if(page) {
    
      dispatch(getPosts(page));
    }
  }, [page, dispatch]);
  return (
    <>
      <Pagination
        classes={{ root: classes.root }}
        count={numberofPages}
        page={Number(page) || 1}
        color="primary"
        renderItem={(item) => (
          <PaginationItem {...item} component={Link} to={`/posts?page=${item?.page}`} />
        )}
       
      />
     
    </>
  );
};

export default Paginate;
