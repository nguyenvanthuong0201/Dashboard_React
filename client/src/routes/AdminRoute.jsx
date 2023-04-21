import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from '../scenes/global/SiderBar';
import TopBar from '../scenes/global/TopBar';

const AdminRoute = ({user}) => {
    return (user && user.role === '0') ? (
      <>
        <div className="app bg-gray-200 dark:bg-slate-900">
          <Sidebar/>
          <main main className='content'>
            <TopBar/>
            <Outlet />
          </main>
        </div>
      </>
    )
     : <Navigate to="/login" />;
}
export default AdminRoute
