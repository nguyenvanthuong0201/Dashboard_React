import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../scenes/global/SiderBar';
import TopBar from '../scenes/global/TopBar';
import ProgressLoader from '../components/ProgressLoader';

const AdminRoute = ({ user, isLoading }) => {

  return (user) ? (
    <>
      {isLoading && (<ProgressLoader />)}
      <div className="app bg-gray-200 dark:bg-slate-900">
        <Sidebar />
        <main main className='content'>
          <TopBar />
          <Outlet />
        </main>
      </div>
    </>
  )
    : <Navigate to="/login" />;
}
export default AdminRoute
