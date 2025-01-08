import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const VerifyEmailPage = () => {
	const [code, setCode] = useState(["", "", "", "", "", ""]);            //this line shows the code input fields
	const inputRefs = useRef([]);                  //this line shows the input fields     
	const navigate = useNavigate();                 //this line shows the navigate function from the react-router-dom

	const {error,isLoading,verifyEmail} = useAuthStore();               //this line shows the error,isLoading and verifyEmail function from the useAuthStore


	const handleChange = (index, value) => {
		const newCode = [...code];                 //this line shows the new code

		
		if (value.length > 1) {                      //if the value is more than 1 digit it will split the value and put it in the input field
			const pastedCode = value.slice(0, 6).split("");
			for (let i = 0; i < 6; i++) {
				newCode[i] = pastedCode[i] || "";
			}
			setCode(newCode);               //this newCode shows the new code in the input field

			const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");           //this will find the last filled index
			const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
			inputRefs.current[focusIndex].focus();
		} else {                            //this else part shows the value in the input field
			newCode[index] = value;
			setCode(newCode);

			if (value && index < 5) {              //this will focus the next input field
				inputRefs.current[index + 1].focus();
			}
		}
	};

	const handleKeyDown = (index, e) => {                   //this function shows when clicked backspace it will focus the previous input field
		if (e.key === "Backspace" && !code[index] && index > 0) {
			inputRefs.current[index - 1].focus();
		}
	};

	const handleSubmit = async (e) => {                  //this function shows the verification code submitted
		e.preventDefault();
		const verificationCode = code.join("");
        try {
			await verifyEmail(verificationCode);              //this line shows call to the verifyEmail function from the using importted by useAuthStore.
			navigate("/profile");
			toast.success("Email verified successfully");      //the here toast is used to show the success message after the email is verified
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {                               //this useeffect shows auto submit the code when all the input fields are filled
		if (code.every((digit) => digit !== "")) {
			handleSubmit(new Event("submit"));
		}
	}, [code]);

	return (
		<div className='h-screen flex items-center justify-center '>
			<motion.div
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md'
			>
				<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
					Verify Your Email
				</h2>
				<p className='text-center text-gray-300 mb-6'>Enter the 6-digit code sent to your email address.</p>

				<form onSubmit={handleSubmit} className='space-y-6'>
                    <div className='flex justify-between'>
                        {code.map((digit, index) => (             //this map function shows the input fields
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}            //this ref will show the input fields and el shows the element
                                    type='text'
                                    maxLength='6'
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className='w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-green-500 focus:outline-none'
                                />
                            ))}
					</div>
                    
					{error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}          {/*this line shows the error message if any error occurs*/}

                    <motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						type='submit'
						disabled={isLoading || code.some((digit) => !digit)}
						className='w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50'
					>
						{isLoading ? "Verifying..." : "Verify Email"}          
					</motion.button>
					
				</form>
			</motion.div>
		</div>
	);
};
export default VerifyEmailPage;