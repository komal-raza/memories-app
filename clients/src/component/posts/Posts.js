import React from 'react';
import Post from './Post/Post';
import useStyles from './styles';
import {useSelector} from 'react-redux';
import {Grid, CircularProgress} from '@material-ui/core'

const Posts = ({setCurrentId}) => {

  const {posts} = useSelector((state) => state.posts);  //in that hook we access to whole global state/store 
   
  
  const classes = useStyles();
    //initialize it as hook

    return(
      !posts?.length  ?<h2 style={{display:"flex",justifyContent:"center",alignItems:"center"}}> No Post Found</h2> : (
       <Grid className={classes.container} container alignItems="stretch" spacing={3} >
       {
         posts?.map((postelm) => (
           <Grid key={postelm._id} item xs={12} sm={12} md={6} lg={4} >
            <Post post={postelm} setCurrentId={setCurrentId}/>
           </Grid>
         ))}
       </Grid>
    )
  )
};

export default Posts;
