//using this file we can check the token is valid or not
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {            //when using next() it will go to the next middleware in the auth.route.js file checkAuth
    const token = req.cookies.token;                       //Gets the token from the cookies.
    if(!token) return res.status(401).json({success: false, message: "Unauthorized-no token provided! You need to login first"});        //Returns an error if there is no token.
   
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);        //Verifies the token using the JWT_SECRET from the .env file.

        if(!decoded) return res.status(401).json({success: false, message: "Unauthorized - invalide token verification failed! You need to login first"});        //Returns an error if the token verification fails.
        req.userID = decoded.userID;        //Sets the userId in the request object to the id in the decoded token.
        next();        //Calls the next middleware in the auth.route.js file.

    } catch (error) {
        console.error("Error in verifyToken", error);
        return res.status(500).json({success: false, message: "server error"});        //Returns an error if there is an internal server error
    }

}