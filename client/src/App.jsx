import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useGetUser } from './queries/useUser';
import AdminRoute from './routes/AdminRoute';
import Calendar from './scenes/calendar';
import Dashboard from './scenes/dashboard';
import ErrorPage from './scenes/global/ErrorPage';
import Home from './scenes/home';
import Login from './scenes/login';
import ProgressLoader from './components/ProgressLoader';
import Clothes from './scenes/clothes';
import User from './scenes/user';

function App() {
  axios.defaults.withCredentials = true;
  const { t } = useTranslation();
  const [user, setUser] = useState()
  const { isLoading } = useGetUser({
    retry: 1,
    onSuccess: (data) => {
      setUser(data?.result)
    },
    onError: (error) => {
      setUser(null)
    },
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home user={user} isLoading={isLoading} />} />
        <Route path="/login" element={<Login user={user} isLoading={isLoading} />} />
        {user && (
          <Route path="/admin" element={<AdminRoute user={user} isLoading={isLoading} />} >
            <Route path="/admin" element={<Dashboard user={user} isLoading={isLoading} />} />
            <Route path="/admin/users" element={<User user={user} />} />
            <Route path="/admin/user/:id" element={<User user={user} />} />
            <Route path="/admin/clothes" element={<Clothes />} />
            <Route path="/admin/calendar" element={<Calendar user={user} />} />
          </Route>
        )}
        <Route path="/permission-denied" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
