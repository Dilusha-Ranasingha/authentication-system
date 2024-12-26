import { User } from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { genarateVerificationToken } from '../utils/genarateVerificationToken.js'; 

export const signup = async (req, res) => {
    const { email, password, name } = req.body;           //get the email, password, and name from the request body.
    
    try {
        if(!email || !password || !name){                 //Checks if the email, password, and name are provided in the request body.
            throw new Error('All field required');
        }
        const userAllreadyExist = await User.findeOne({email});            //Checks if the user already exists in the database.
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
        })

        await user.save();          //Saves created user in the database.
        
    } catch (error) {
        return res.status(400).json({success: false, massage: Error.massage});          //If there is an error, it sends a response with the error message.
    }
}

export const login = async (req, res) => {
    res.send('login route');
}

export const logout = async (req, res) => {
    res.send('logout route');
}