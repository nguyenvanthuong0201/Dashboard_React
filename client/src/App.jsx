import {ColorModeContext, useMode} from './theme';
import {CssBaseline,ThemeProvider} from '@mui/material';
import TopBar from './scenes/global/TopBar';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Sidebar from './scenes/global/SiderBar';
import Dashboard from './scenes/dashboard';
import { useTranslation } from 'react-i18next'
import Calendar from './scenes/calendar';

function App() {
  const [theme, colorMode] = useMode();
  const {t} = useTranslation();
   return (
    <BrowserRouter>
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
      <CssBaseline/>
        <div className="app">
          <Sidebar/>
          <main className='content'>
              <TopBar/>
              <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/calendar" element={<Calendar />} />
              {/*<Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} /> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
    </BrowserRouter>
  )
}

export default App
