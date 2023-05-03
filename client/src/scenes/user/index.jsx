import React, { useState } from 'react'
import ProgressLoader from '../../components/ProgressLoader'
import TableCustom from '../../components/TableCustom'
import { useGetListUser } from '../../queries/useUser'
import { useTranslation } from 'react-i18next'
import Header from '../../components/Header'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Avatar, Drawer, Typography } from '@mui/material'
import ActionUser from './ActionUser'

const User = () => {
    const { data, isLoading } = useGetListUser();
    const [openDrawer, setOpenDrawer] = useState(false)
    const { t, i18n } = useTranslation();
    const columns = [
        {
            id: 'avatar',
            label: t('avatar'),
            minWidth: 120,
            format: ({ value, row }) => (
                <Avatar className="border-2 !border-[#10b6cf]" sx={{ width: 32, height: 32  }} alt={value ? value.public_id : "user"} src={value ? value.url : '/user.png'} />
            ),
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
            id: 'workName',
            label: t('work_name'),
            minWidth: 120,
        },
    ]
    return (<>
        <div div className='relative rounded-md mr-3 bg-gray-100 text-slate-900 dark:text-white dark:bg-slate-800' >
            {isLoading && (<ProgressLoader />)}
            <div className='p-5'>
                <div className='flex justify-between'>
                    <Header title={t('user')} subtitle={t('user')} />
                    <button type='button' onClick={() => setOpenDrawer(true)}
                        className='button-link rounded-xl outline-none w-40 text-white font-bold flex items-center'
                    >
                        <PersonAddIcon />  Create User
                    </button>
                </div>
                <ActionUser openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
                <TableCustom
                    className='mt-3'
                    rows={data?.result}
                    columns={columns}
                />
            </div>
        </div>
    </>
    )
}

export default User