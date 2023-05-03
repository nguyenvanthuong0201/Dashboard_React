import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useEffect } from 'react';
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { currencies } from "../constants/Select";
import { useDarkSide } from "../theme";
import { useLocation } from "react-router-dom";


const SelectLanguages = () => {
  const theme = localStorage.getItem('theme') 
  const { i18n } = useTranslation()
  const [language, setLanguage] = useState(localStorage.getItem('language'))
  const location = useLocation();
  
  const handleChangeLanguages = (e) => {
    localStorage.setItem('language', e.target.value)
    setLanguage(e.target.value)
    i18n.changeLanguage(e.target.value)
  }

  return (
    <Select
      value={language || 'en'}
      className="w-28 flex items-center h-9  text-slate-900 dark:text-white  dark:bg-slate-900"
      onChange={(e) => handleChangeLanguages(e)}
      sx={{
        color: theme === 'dark' ? "black" : 'white',
        '.MuiOutlinedInput-notchedOutline': {
          borderColor: '#10b6cf',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#10b6cf',
        },
        '&.MuiMenu-paper': {
          background: "red"
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#10b6cf',
        },
        '.MuiSvgIcon-root ': {
          fill: theme === 'dark' ? " white !important" : 'black !important',
        }
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            bgcolor: theme === 'dark' ? "#0F172A" : '#E5E7EB',
          },
        },
      }}
    >
      {currencies.map((option) => (
        <MenuItem className=" text-slate-900 dark:text-white" key={option.value} value={option.value} style={{ display: "flex", alignItems: "center" }}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  )
}

export default SelectLanguages