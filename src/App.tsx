
import './App.css'
import { LoginForm } from './components/LoginForm'
import { Toaster } from 'react-hot-toast'
import { useAuth } from './providers/FakeAuth.provider'
import { WelcomePage } from './components/WelcomePage'
import { LogoutButton } from './components/LogoutButton'
import { SignUpForm } from './components/SignUpForm'



function App() {
  
const {loginStatus} = useAuth()

  return (
    <>
      <Toaster />
      {loginStatus === "LoggedOut" && <LoginForm />}
      {loginStatus === "LoggedIn" && <WelcomePage>
        <LogoutButton/></WelcomePage>}
      {loginStatus === "SignUp" && <SignUpForm/>}
    </>
  );
}

export default App
