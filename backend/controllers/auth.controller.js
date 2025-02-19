import { User } from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import { genarateVerificationToken } from '../utils/genarateVerificationToken.js'; 
import { genarateTokenAndSetCookie } from '../utils/genarateTokenAndSetCookie.js';
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail } from '../mailtrap/emails.js';
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
    const { email, password } = req.body;          //Gets the email and password from the request body what user entered.
    try {
        const user = await User.findOne({ email });          //Finds the user with entered email in the database.
        if(!user){
            return res.status(400).json({ success: false, message: 'Invalid credentials' });      //If the user is not found matched with the entered email, show invalid credentials.
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);          //Compares the entered password with the password in the database.
        if(!isPasswordValid){
            return res.status(400).json({ success: false, message: 'Invalid credentials' });      //If the password is invalid show invalid credentials.
        }

        genarateTokenAndSetCookie(res, user._id);          //If the user is found and the password is valid, it generates a token and sets it in the cookie.

        user.lastLogin = Date.now();          //Sets the last login time to the current time after user login.
        await user.save();          //Saves the user in the database.

        res.status(200).json({          //Sends a response with a message and the user data.
            success: true,          //If the user is logged in successfully, it sends a response with success true.
            message: 'Login successfully',          //If the user is logged in successfully, it sends a response with a message.
            user: {          //If the user is logged in successfully, it sends the user data in the response.
                ...user._doc,          //Sends the user data in the response.
                password: undefined          //Sends the user data in the response without the password.
            },
        });

        
    } catch (error) {
        console.log('Error in login', error);
        res.status(400).json({ success: false, message: error.message });          //If there is an error, it sends a response with the error message.
    }
}

export const logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ success: true, message: 'Logout successfully' });
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body;          //Gets the email from the request body from user entered.
    try {
        const user = await User.findOne({ email });          //Finds the user with the entered email in the database.
        if(!user){
            return res.status(400).json({ success: false, message: 'User not found' });      //If the user is not found, it sends a response with a message.
        }

        const resetToken = crypto.randomBytes(20).toString('hex');          //Generates a random reset token.
        const restTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;          //Sets the reset token expiration time to 1 hour.

        user.resetPasswordToken = resetToken;          //Sets the reset token in the user data.
        user.resetPasswordExpiresAt = restTokenExpiresAt;          //Sets the reset token expiration time in the user data.

        await user.save();          //Saves the user in the database.

        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);         //Calls the sendPasswordResetEmail() function with the user email and reset token in the link to send the password reset email.

        res.status(200).json({ success: true, message: 'Password reset link sent to your email' });          //Sends a response with a message if the password reset email is sent successfully.

    } catch (error) {
        console.log('Error in forgot password', error);
        res.status(400).json({ success: false, message: error.message });          //If there is an error, it sends a response with the error message.
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;          //Gets the reset token from the request params.
        const { password } = req.body;          //Gets the new password from the request body.

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() },          //Checks if the reset token is not expired.
        });

        if(!user){
            return res.status(400).json({ success: false, message: 'Invalid or expired reset token' });          //If the user is not found, it sends a response with a message.
        }

        //update password
        const hashedPassword = await bcryptjs.hash(password, 10);          //Hashes the new password using bcryptjs.

        user.password = hashedPassword;          //Sets the new password in the user data.
        user.resetPasswordToken = undefined;          //Sets the reset token to delete.
        user.resetPasswordExpiresAt = undefined;          //Sets the reset token expiration time to delete.
        await user.save();          //Saves the user in the database.

        await sendResetSuccessEmail(user.email);          //Calls the sendResetSuccessEmail() function with the user email to send the password reset success email.

        res.status(200).json({ success: true, message: 'Password reset successfully' });          //Sends a response with a message if the password is reset successfully.
        
    } catch (error) {
        console.log('Error in reset password', error);
        res.status(400).json({ success: false, message: error.message });          //If there is an error, it sends a response with the error message.
    }
}


export const checkAuth = async (req,res) => {
    try {
        const user = await User.findById(req.userID).select("-password");          //Finds the user with the userId in the request object and selects all the fields except the password.
       
        if(!user){
            return res.status(400).json({ success: false, message: 'User not found' });          //If the user is not found, it sends a response with a message.
        }
        res.status(200).json({ success: true, user});
    }
    catch (error) {
        console.log('Error in check auth', error);
        res.status(400).json({ success: false, message: error.message });          //If there is an error, it sends a response with the error message.
    }
}