import React from 'react'
import ProgressLoader from '../../components/ProgressLoader'

const Dashboard = ({user, isLoading}) => {

  return (
    <div className=' bg-gray-100 text-slate-900 dark:text-white dark:bg-slate-800'>
      {isLoading && (<ProgressLoader/>)}
      Dashboard
    </div>
  )
}

export default Dashboard