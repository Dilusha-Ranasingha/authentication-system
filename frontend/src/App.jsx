import { Navigate, Route, Routes } from "react-router-dom";
import FlotingShape from "./components/flotingShape";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";

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
  const {isCheckingAuth, checkAuth, isAuthenticated, user} = useAuthStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  console.log("isAuthenticated", isAuthenticated);
  console.log("user", user);

  return (
    <div 
      className='min-h-screen bg-gradient-to-br from-gray-400 to-blue-900 to-emarald-900 flex item-center justify-center relative overflow-hidden'>
      <FlotingShape color="bg-blue-500" size="w-64 h-64" top="-5%" left="10%" delay={0} />
      <FlotingShape color="bg-blue-500" size="w-48 h-48" top="70%" left="80%" delay={5} />
      <FlotingShape color="bg-blue-500" size="w-32 h-32" top="40%" left="-10%" delay={2} />


      <Routes>
        <Route path='/' element={"Home"} />
        <Route path='/signup' element={<RedirectAuthenticatedUser><SignUpPage /></RedirectAuthenticatedUser>} />
        <Route path='/login' element={<RedirectAuthenticatedUser><LoginPage /></RedirectAuthenticatedUser>} />
        <Route path='/verifyemail' element={<VerifyEmailPage />} />
      </Routes>
      <Toaster/>

    </div>
  )
}

export default App;
