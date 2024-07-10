import { useState } from "react";
import { useAuth } from "../providers/FakeAuth.provider";
import toast from "react-hot-toast";

export const LoginForm = () => {
  const [userNameInput, setUserNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");


  
  const { login, setLoginStatus } = useAuth();



  return (
    <section>
      <h2>Login</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login({ userName: userNameInput, password: passwordInput })
          .then(() => toast.success('Logged in Successfully :)'))
          .catch((e : Error)=>toast.error(e.message));
        }}
      >
        <input
          type="text"
          placeholder="userName"
          onChange={(e) => {
            setUserNameInput(e.target.value);
          }}
          value={userNameInput}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => {
            setPasswordInput(e.target.value);
          }}
          value={passwordInput}
        />
        <input type="submit" value="Login" />
      </form>
      <button onClick={()=>{
         setLoginStatus('SignUp'),
         console.log("I got clicked")
         }}>New User? Sign Up Here!</button>
    </section>
  );
};
