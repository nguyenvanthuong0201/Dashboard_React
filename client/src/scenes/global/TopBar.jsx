import React, { useEffect } from 'react'
import { Box, IconButton, useTheme } from "@mui/material"
import { useContext } from 'react'
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SelectLanguages from '../../components/SelectLanguages';
import LogoutIcon from '@mui/icons-material/Logout';

import { useState } from 'react';
import { useDarkSide } from '../../theme';
import { useLogoutUser } from '../../queries/useUser';
import { useNavigate } from 'react-router-dom';

const TopBar = () => {
    const navigate = useNavigate();
    const [colorTheme, setTheme] = useDarkSide();
    const [darkSide, setDarkSide] = useState(
        colorTheme === "dark" ? true : false
    );
    const toggleDarkMode = () => {
        localStorage.setItem('theme', colorTheme);
        setTheme(colorTheme);
        setDarkSide(!darkSide);
    }

    const { mutate: logout } = useLogoutUser();
    const handleLogout = () => {
        localStorage.setItem('theme', 'dark');
        logout();
        navigate('/')
    }
    return (
        <div className='flex justify-end p-3 text-slate-900 dark:text-white z-40'>
            <IconButton className=' text-slate-900 dark:text-white'
                onClick={toggleDarkMode}>
                {darkSide ? (
                    <DarkModeOutlinedIcon />
                ) : (
                    <LightModeOutlinedIcon />
                )}
            </IconButton>
            <IconButton className=' text-slate-900 dark:text-white'>
                <SettingsOutlinedIcon />
            </IconButton >
            <SelectLanguages />
            <IconButton className=' text-slate-900 dark:text-white'>
                <NotificationsOutlinedIcon />
            </IconButton>
            <IconButton className=' text-slate-900 dark:text-white' onClick={() => handleLogout()}>
                <LogoutIcon />
            </IconButton>
        </div>
    )
}

export default TopBar