import { makeStyles } from "@material-ui/core/styles"; //named import not a default import

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: "1rem",
    display: "flex",
    padding: "16px",
  },
  searchButton:{
    margin:"1rem 0"
    
  },
  pagination: {
    borderRadius: 4,
    
    marginTop: "1rem",
    padding: "16px",
  },

  gridontainer:{
    [theme.breakpoints.down('xs')]:{
     flexDirection: "column-reverse"     
  },
  },
}));
