import { Navigate, Outlet } from 'react-router-dom';
import { baseAccessTokenName } from '../DataServices/Axios';

const useAuth = (): boolean => {
  const accessToken: string | null = localStorage.getItem(baseAccessTokenName);
  return accessToken !== null;
}

export default function ProtectedRoutes(): JSX.Element | null {
  const isAuth: boolean = useAuth();

  return isAuth ? <Outlet /> : <Navigate to="/auth/login" />;
}
