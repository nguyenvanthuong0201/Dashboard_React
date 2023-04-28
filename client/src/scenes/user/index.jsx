import React from 'react'
import ProgressLoader from '../../components/ProgressLoader'
import TableCustom from '../../components/TableCustom'
import { useGetListUser } from '../../queries/useUser'

const User = () => {
    const { data, isLoading } = useGetListUser();
    console.log('data', data)
    const columns = [
        {
            id: 'avatar',
            label: t('avatar'),
            minWidth: 120,
        },
        {
            id: 'name',
            label: t('name'),
            minWidth: 120,
        },
        {
            id: 'email',
            label: t('email'),
            minWidth: 120,
        },
        {
            id: 'work_name',
            label: t('work_name'),
            minWidth: 120,
        },
    ]
    return (
        <div className='app bg-gray-100 text-slate-900 dark:text-white dark:bg-slate-800'>
            {isLoading && (<ProgressLoader />)}
            <Header title={t('user')} subtitle={t('user')} />
            <TableCustom
                style={{ height: 'calc(100% - 100px)' }}
                rows={data}
                columns={columns}
            />
        </div>
    )
}

export default User