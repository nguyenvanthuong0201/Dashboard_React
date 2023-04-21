import TopBar from './scenes/global/TopBar';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Sidebar from './scenes/global/SiderBar';
import Dashboard from './scenes/dashboard';
import { useTranslation } from 'react-i18next'
import Calendar from './scenes/calendar';
import { useGetCalendar } from './queries/useCalendar';
import Home from './scenes/home';
import ErrorPage from './scenes/global/ErrorPage';
import AdminRoute from './routes/AdminRoute';
import { useGetUser } from './queries/useUser';

function App() {
  const { t } = useTranslation();
  const { data, isLoading } = useGetUser();
  console.log('data,', data, isLoading)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminRoute />} >
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/calendar" element={<Calendar />} />
        </Route>
        <Route path="/permission-denied" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
