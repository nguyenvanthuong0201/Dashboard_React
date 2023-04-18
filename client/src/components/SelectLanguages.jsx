import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React from 'react';
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { currencies } from "../constants/Select";


const SelectLanguages = () => {
  const { i18n } = useTranslation()
  const [language, setLanguage] = useState(localStorage.getItem('language'))
  const handleChangeLanguages = (e) =>{
    localStorage.setItem('language', e.target.value)
    setLanguage(e.target.value)
    i18n.changeLanguage(e.target.value)
  }
  return (
      <Select
      value={language || 'en'}
      className="w-28 flex items-center h-9  text-slate-900 dark:text-white"
      onChange={(e)=>handleChangeLanguages(e)}
      sx={{
        color: "white",
        '.MuiOutlinedInput-notchedOutline': {
          borderColor: 'red',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'red',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'red',
        },
        '.MuiSvgIcon-root ': {
          fill: "white !important",
        }
      }}
      >
        {currencies.map((option) => (
          <MenuItem className=" text-white  dark:text-slate-900" key={option.value} value={option.value} style={{display:"flex",alignItems:"center"}}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
  )
}

export default SelectLanguages