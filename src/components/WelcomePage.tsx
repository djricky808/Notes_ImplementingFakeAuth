import { ReactNode } from "react";

export const WelcomePage = ({children}: {children:ReactNode}) => {
    return (
      <section
        style={{
          backgroundColor: "#405D72",
        }}
      >
        <h1>Welcome!!!</h1>
        {children}
      </section>
    );
}