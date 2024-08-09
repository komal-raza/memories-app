import { makeStyles } from "@material-ui/core/styles";  //named import not a default import

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 10,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  
  },
  heading: {
    fontSize: "20",
    color: "rgba(0,183,255, 1)",
  },
  image: {
    marginLeft: "15px",
  },
  //breking point for small devices and layout change on such devices
  [theme.breakpoints.down('sm')]:{
    mainContainer: {
      flexDirection: "column-reverse"
    }
  }
  ,
}));
