import axios from 'axios';
import { useState } from 'react';
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
  console.log('user', user)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home user={user} isLoading={isLoading} />} />
        <Route path="/login" element={<Login user={user} isLoading={isLoading} />} />
        <Route path="/admin" element={user ? <AdminRoute user={user} isLoading={isLoading} /> : <ProgressLoader />} >
          <Route path="/admin" element={user ? <Dashboard user={user} isLoading={isLoading} /> : <ProgressLoader />} />
          <Route path="/admin/calendar" element={<Calendar user={user} />} />
        </Route>
        <Route path="/permission-denied" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
