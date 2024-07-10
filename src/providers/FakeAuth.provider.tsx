//How to set up Fake Authentication

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { Requests } from "../api";

export type TUserLogin = {
  userName: string;
  password: string;
};

export type TUserNameOnly = {
  userName: string;
};

export type TLoginStatus = "LoggedOut" | "SignUp" | "LoggedIn";

export type TLoginProvider = {
    user: TUserLogin | null;
    setUser: Dispatch<SetStateAction<TUserLogin | null>>
    register: ({userName, password} : TUserLogin)=> Promise<void>;
    logout: () => void;
    login: ({userName, password}: TUserLogin) => Promise<void | string>;
    loginStatus: string;
    setLoginStatus: Dispatch<SetStateAction<TLoginStatus>>
};

const AuthContext = createContext({} as TLoginProvider);

//user :{username: string, password: string}
export const AuthProvider = ({ children }: {children: ReactNode}) => {
  const [user, setUser] = useState<TUserLogin | null>(null);

    const [loginStatus, setLoginStatus] = useState<TLoginStatus>("LoggedOut");

  //Registers a new username and password
  const register = ({ userName, password }: TUserLogin) => {
    return Requests.registerFetch({ userName, password }).then((user) => {
      localStorage.setItem("user", JSON.stringify(user));
      //You can find this on your browser by going to devtools/ applications/ localstorage
      return setUser(user);
    });
  };

  const login = async ({userName, password} : TUserLogin) => {
    const user = await Requests.getUserFromServer({ userName });
    if(user.password !== password) {
        throw new Error("Invalid Password")
    }
    setUser(user);
    setLoginStatus("LoggedIn")
  }

  //Logs the current user out.
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setLoginStatus("LoggedOut")
  };
  //We can use a use effect to check the local storage if the username exists in the local storage, and if it is there we want to set it to that user on the app.
  useEffect(() => {
    const maybeUser = localStorage.getItem("user");
    if (maybeUser) {
      setUser(JSON.parse(maybeUser));
      //In setUser, we are decoding the JSON string back into a user JavaScript object and then set that.
      //If maybeUser doesn't exist, then it does nothing.
      setLoginStatus("LoggedIn")
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, register, logout, login, loginStatus, setLoginStatus}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    return {
        user: context.user,
        setUser: context.setUser,
        register: context.register,
        logout: context.logout,
        login: context.login,
        loginStatus: context.loginStatus,
        setLoginStatus: context.setLoginStatus,
    };
}
