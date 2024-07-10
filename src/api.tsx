import { TUserLogin, TUserNameOnly } from "./providers/FakeAuth.provider";

export const Requests = {
  registerFetch: ({ userName, password }: TUserLogin): Promise<TUserLogin> => {
    return fetch("http://localhost:3000/app-users", {
      method: "POST",
      body: JSON.stringify({ userName, password }),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      if (!response.ok) {
        throw new Error("registering user failed");
      }
      return response.json();
    });
  },

  getUserFromServer: ({userName}: TUserNameOnly): Promise<TUserLogin> =>
    fetch("http://localhost:3000/app-users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not get user");
        }
        return response.json();
      })
      .then((users: TUserLogin[]) =>
        users.find((user: TUserLogin) => user.userName === userName)
      )
      .then((user) => {
        if (!user) {
          throw new Error("User not Found");
        }
        return user;
      }),
};
