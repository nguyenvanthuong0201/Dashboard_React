import React from 'react'
import {Box, IconButton, useTheme} from "@mui/material"
import { useContext } from 'react'
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { ColorModeContext, tokens } from '../../theme';
import SelectLanguages from '../../components/SelectLanguages';

const TopBar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext)

  return (
    <Box display="flex" justifyContent={"end"} p={2}>
        <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode ==='dark' ? (
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