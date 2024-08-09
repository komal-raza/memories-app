import jwt from "jsonwebtoken";

const auth = async(req, res, next) => {
 
  try {
    // console.log("Header" ,req.headers)
    const token = req.headers.authorization.split(" ")[1];
    const customAuth = token.length < 500;
    let decodedData;
    if (token && customAuth) {
      decodedData = jwt.verify(token, "test");
      

      req.userId = decodedData?.id;
     
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
     
    }
   next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
