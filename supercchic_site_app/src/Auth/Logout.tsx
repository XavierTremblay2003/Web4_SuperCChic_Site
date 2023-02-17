import { useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import AccountDataService from '../DataServices/AccountDataService';

export default function Logout(): JSX.Element {
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    AccountDataService.logout()
    navigate('/auth/login')
  });

  return <div />;
}
