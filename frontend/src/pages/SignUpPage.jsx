import {motion} from "framer-motion";
import Input from "../components/Input";
import { Loader, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useAuthStore } from "../store/authStore";

const SignUpPage = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { signup,error,isLoading } = useAuthStore();

  const handleSignUp = async(e) => {
    e.preventDefault();           //this line is use to prevent the default behaviour of the form

    try {
      await signup(email, password, name);          //this line is use to call the signup function from the authStore.js file
      navigate("/verifyemail")                      //this line is use to navigate to the verifyemail page after the signup is successfull
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="h-screen flex items-center justify-center ">         
      <motion.div
      initial={{ opacity: 0, y:20 }}
      animate={{ opacity: 1, y:0 }}
      transition={{ duration: 0.5 }}
      className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl shadow-xl overflow-hidden'
      >
        <div className='p-8'>
          <h2 
            className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-emerald-500 text-transparent bg-clip-text'>
            Creat Account
          </h2>

          <form onSubmit={handleSignUp}>
            <Input                      //this is a one imported imput field component
              icon={User}               //this is a user icon from lucide-react
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input                      //this is a another imported imput field component
              icon={Mail}               //this is a mail icon from lucide-react
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />


            <Input
              icon={Mail}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className='text-red-500 text-semibold mt-2'>{error}</p>}   {/*this is a error message that is shown in the UI if any error occurs*/}

            <PasswordStrengthMeter password={password} />                 {/*this is a password strength meter component*/}
            
            <motion.button
              className='mt-5 w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              type='submit'
              disabled={isLoading}
            >
              {isLoading ? <Loader className=' animate-spin mx-auto ' size={24} /> : "Sign Up"}   {/*this is a loader component that is shown in the UI when the signup button is clicked*/}
            </motion.button>
          </form>
        </div>

        <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
          <p className='text-sm text-gray-400' >
            Already have an account?{" "}
            <Link to={"/login"} className='text-blue-500 hover:underline'>
              Login
            </Link>
          </p>
        </div>


      </motion.div>
    </div>
    );
};

export default SignUpPage;