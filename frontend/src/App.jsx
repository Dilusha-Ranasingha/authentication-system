import { Navigate, Route, Routes } from "react-router-dom";
import FlotingShape from "./components/flotingShape";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";

//protect route that requires user to be authenticated
const ProtectedRoute = ({children}) => {
  const {isAuthenticated,user} = useAuthStore();

  if(!isAuthenticated){
    return <Navigate to="/login" replace />
  }
  if(!user.isVerified){
    return <Navigate to="/verifyemail" replace />
  }
  return children;
}

//redirect authenticated user to the home page
const RedirectAuthenticatedUser = ({children}) => {
  const {isAuthenticated,user} = useAuthStore();

  if(isAuthenticated && user.isVerified){
    return <Navigate to="/" replace />
  }
  return children;
}

function App() {
  const {isCheckingAuth, checkAuth} = useAuthStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if(isCheckingAuth){
    return <LoadingSpinner />;             //this line shows the loading spinner when connection was slow
  }

  return (
    <div 
      className='min-h-screen bg-gradient-to-br from-gray-400 to-blue-900 to-emarald-900 flex item-center justify-center relative overflow-hidden'>
      <FlotingShape color="bg-blue-500" size="w-64 h-64" top="-5%" left="10%" delay={0} />
      <FlotingShape color="bg-blue-500" size="w-48 h-48" top="70%" left="80%" delay={5} />
      <FlotingShape color="bg-blue-500" size="w-32 h-32" top="40%" left="-10%" delay={2} />


      <Routes>
        <Route path='/' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path='/signup' element={<RedirectAuthenticatedUser><SignUpPage /></RedirectAuthenticatedUser>} />
        <Route path='/login' element={<RedirectAuthenticatedUser><LoginPage /></RedirectAuthenticatedUser>} />
        <Route path='/verifyemail' element={<VerifyEmailPage />} />
        <Route path='/forgotpassword' element={<RedirectAuthenticatedUser><ForgotPasswordPage /></RedirectAuthenticatedUser>} />
        <Route path='/reset-password/:token' element={<RedirectAuthenticatedUser><ResetPasswordPage /></RedirectAuthenticatedUser>} />
      </Routes>
      <Toaster/>

    </div>
  )
}

export default App;
