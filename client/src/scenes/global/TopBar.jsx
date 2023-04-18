import React from 'react'
import {Box, IconButton, useTheme} from "@mui/material"
import { useContext } from 'react'
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SelectLanguages from '../../components/SelectLanguages';
import { useState } from 'react';
import { useDarkSide } from '../../theme';

const TopBar = () => {
    const [colorTheme, setTheme] = useDarkSide();
    const [darkSide, setDarkSide] = useState(
        colorTheme === "light" ? true : false
    );
    const toggleDarkMode = () =>{
        setTheme(colorTheme);
        setDarkSide(!darkSide);
    }

  return (
    <div className='flex justify-end p-3 text-slate-900 dark:text-white'>
        <IconButton className=' text-slate-900 dark:text-white'
        onClick={toggleDarkMode}>
            {darkSide ? (
                <DarkModeOutlinedIcon/>
            ):(
                <LightModeOutlinedIcon/>
            )}
        </IconButton>
        <IconButton className=' text-slate-900 dark:text-white'>
            <SettingsOutlinedIcon/>
        </IconButton >
        <SelectLanguages/>
        <IconButton className=' text-slate-900 dark:text-white'>
            <NotificationsOutlinedIcon/>
        </IconButton>
        <IconButton className=' text-slate-900 dark:text-white'>
            <PersonOutlinedIcon/>
        </IconButton>
    </div>
  )
}

export default TopBar