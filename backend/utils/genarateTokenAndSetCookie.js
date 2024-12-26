//this file is used to generate a token and set it in the cookie
import jwt from "jsonwebtoken";     //Import jwt to create a token

export const genarateTokenAndSetCookie = (res, userID) => {                //Create a function to genarate a token using the userID and set it in the cookie
    const token = jwt.sign({ userID }, process.env.JWT_SECRET, {          //Create a token using the userID and JWT_SECRET from the .env file
        expiresIn: "7D",                       //The token will expire after 7 days
    });

    res.cookie("token", token, {          //Set the token in the cookie
        httpOnly: true,                   //The cookie is only accessible by the web server
        secure: process.env.NODE_ENV === "production",               //The cookie is only sent over HTTPS
        sameSite: "strict",                  //The cookie is not sent on cross-origin requests
        maxAge: 7 * 24 * 60 * 60 * 1000,             //The cookie will expire after 7 days
    });

    return token;                    
};