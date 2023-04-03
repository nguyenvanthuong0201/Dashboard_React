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
      style={{width:"90px",display:"flex",alignItems:"center",height:"38px"}}
      onChange={(e)=>handleChangeLanguages(e)}
      >
        {currencies.map((option) => (
          <MenuItem key={option.value} value={option.value} style={{display:"flex",alignItems:"center"}}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
  )
}

export default SelectLanguages