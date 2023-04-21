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

function App() {
  const {t} = useTranslation();
  const {data,isLoading} = useGetUser();
  console.log('data,', data,isLoading )
  return (
    <BrowserRouter>
            <Routes>
            <Route path="/" element={<Home />} /> 
            <div className="app bg-gray-200 dark:bg-slate-900">
            <Sidebar/>
          <main main className='content'>
            <TopBar/>
            <AdminRoute path="/admin/dashboard"><Dashboard /></AdminRoute>
            <AdminRoute path="/admin/calendar"><Calendar /></AdminRoute>
            <Route path="/permission-denied" element={<ErrorPage />} /> 
            </main>
            </div>
            </Routes>
    </BrowserRouter>
  )
}

export default App
