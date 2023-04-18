import React from 'react'
import {Box, IconButton, useTheme} from "@mui/material"
import { useContext } from 'react'
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { ColorModeContext, tokens, useDarkSide } from '../../theme';
import SelectLanguages from '../../components/SelectLanguages';
import { useState } from 'react';

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
    <Box display="flex" justifyContent={"end"} p={2}>
        <IconButton 
        onClick={toggleDarkMode}>
            {darkSide ? (
                <DarkModeOutlinedIcon/>
            ):(
                <LightModeOutlinedIcon/>
            )}
        </IconButton>
        <IconButton>
            <SettingsOutlinedIcon/>
        </IconButton>
        <SelectLanguages/>
        <IconButton>
            <NotificationsOutlinedIcon/>
        </IconButton>
        <IconButton>
            <PersonOutlinedIcon/>
        </IconButton>
    </Box>
  )
}

export default TopBar