import { useAuth } from "../providers/FakeAuth.provider";

export const LogoutButton = () => {
  const { logout } = useAuth();

  return <button onClick={() => logout()}>Logout</button>;
};
