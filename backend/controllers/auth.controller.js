import { User } from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { genarateVerificationToken } from '../utils/genarateVerificationToken.js'; 
import { genarateTokenAndSetCookie } from '../utils/genarateTokenAndSetCookie.js';
import { sendVerificationEmail } from '../mailtrap/emails.js';
import { sendWelcomeEmail } from '../mailtrap/emails.js';

export const signup = async (req, res) => {
    const { email, password, name } = req.body;           //get the email, password, and name from the request body.
    
    try {
        if(!email || !password || !name){                 //Checks if the email, password, and name are provided in the request body.
            throw new Error('All field required');
        }
        const userAllreadyExist = await User.findOne({email});            //Checks if the user already exists in the database.
        console.log("You Entered user is allready exist is: ",userAllreadyExist);               //Prints the userAllreadyExist in the console if the user already exists.
        if(userAllreadyExist){                              //If the user already exists, it sends a response with a message.
            return res.status(400).json({success: false, massage: 'User already exist'});
        }
        
        
        const hashedPassword = await bcryptjs.hash(password, 10);          //Hashes the password using bcryptjs then user can not see the original password.
        const verificationToken = genarateVerificationToken();               //call the genarateVerificationCode() function to generate 6 digit verification code.
        
        
        const user = new User({                           //Creates a new user email, password, name, and verification code in the database.
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,   //Sets the verification code expiration time to 24hours.
        });

        await user.save();          //Saves created user in the database.

        //JWT
        genarateTokenAndSetCookie(res,user._id);   //Call the genarateTokenAndSetCookie() function to generate a token and set it in the cookie.

        await sendVerificationEmail(user.email, verificationToken);   //Call the sendVerificationEmail() function with the user email and verification code to send the verification email.


        res.status(201).json({       //Sends a response with a message and the created user.
            success: true,            //If the user is created successfully, it sends a response with success true.
            message: "User Create Successfully",              //If the user is created successfully, it sends a response with a message.
            user: {                           //If the user is created successfully, returns the user data in the response.
                ...user._doc,                //Sends the user data in the response.
                password: undefined           //Sends the user data in the response without the password.
            },
        });
        
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });          //If there is an error, it sends a response with the error message.
    }
};

export const verifyEmail = async (req, res) => {
    const { code } = req.body;          //Gets the user entered verification code from the request body.
    try {   
        const user = await User.findOne({                //Finds the user with the verification code and checks if the verification code is valid.
            verificationToken: code,
            verificationTokenExpiresAt: {$gt: Date.now()}          //Checks if the verification code is not expired. $gt is checking the verification code is greater than the current date.
        })

        if(!user){          //If the user is not found, it sends a response with a message.
            return res.status(400).json({ success: false, message: 'Invalid or expired verification code' });      //If the user is not found, it sends a response with a message.
        }

        user.isVerified = true;         //If the user is found, it sets the user isVerified to true.
        user.verificationToken = undefined;       //If the user is found, it sets the verification code to delete.
        user.verificationTokenExpiresAt = undefined;      //If the user is found, it sets the verification code expiration time to delete.
        await user.save();          //Saves the user in the database.

        await sendWelcomeEmail(user.email, user.name);        //Call the sendWelcomeEmail() function with the user email and name to send the welcome email after the user is verified.

        res.status(200).json({
            success: true,
            message: 'Email verified successfully',
            user: {
                ...user._doc,
                password: undefined
            },
        });
    } catch (error) {
        console.log('Error in verify email', error);
        res.status(400).json({ success: false, message: "server error" });      //If there is an error, it sends a response with the
    }
}

export const login = async (req, res) => {
    res.send('login route');
}

export const logout = async (req, res) => {
    res.send('logout route');
}