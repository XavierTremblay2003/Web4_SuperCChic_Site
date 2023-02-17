import { Navigate } from 'react-router-dom';

export default function NotFound(): JSX.Element {
  return <Navigate to="/" />;
}
