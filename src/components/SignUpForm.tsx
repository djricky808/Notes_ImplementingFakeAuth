import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../providers/FakeAuth.provider";

export function SignUpForm() {
  const { register, setLoginStatus } = useAuth();
  const [userNameInput, setUserNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  return (
    <>
      <h2>Create User</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setUserNameInput("");
          setPasswordInput("");
          register({ userName: userNameInput, password: passwordInput })
            .then(() => {
              toast.success("registered");
            })
            .catch(() => {
              toast.error("something went wrong");
            });
        setLoginStatus('LoggedIn')
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
        <input type="submit" value="Sign Up" />
      </form>
    </>
  );
}
