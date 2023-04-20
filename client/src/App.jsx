import TopBar from './scenes/global/TopBar';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Sidebar from './scenes/global/SiderBar';
import Dashboard from './scenes/dashboard';
import { useTranslation } from 'react-i18next'
import Calendar from './scenes/calendar';
import { useGetCalendar } from './queries/useCalendar';

function App() {
  const {t} = useTranslation();
  return (
    <BrowserRouter>
        <div className="app bg-gray-200 dark:bg-slate-900">
          <Sidebar/>
          <main className='content'>
              <TopBar/>
              <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/calendar" element={<Calendar />} />
            </Routes>
          </main>
        </div>
    </BrowserRouter>
  )
}

export default App
