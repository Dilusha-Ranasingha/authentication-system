import { Route, Routes } from "react-router-dom";
import FlotingShape from "./components/flotingShape";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";

function App() {

  return (
    <div 
      className='min-h-screen bg-gradient-to-br from-gray-400 to-blue-900 to-emarald-900 flex item-center justify-center relative overflow-hidden'>
      <FlotingShape color="bg-blue-500" size="w-64 h-64" top="-5%" left="10%" delay={0} />
      <FlotingShape color="bg-blue-500" size="w-48 h-48" top="70%" left="80%" delay={5} />
      <FlotingShape color="bg-blue-500" size="w-32 h-32" top="40%" left="-10%" delay={2} />


      <Routes>
        <Route path='/' element={"Home"} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/verifyemail' element={<VerifyEmailPage />} />
      </Routes>

    </div>
  )
}

export default App;
