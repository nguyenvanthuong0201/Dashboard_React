import LocationOnIcon from "@mui/icons-material/LocationOn";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import SvgIcon from "@mui/material/SvgIcon";
import React from 'react';
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";


const currencies = [
    {
    label: <LocationOnIcon/>,
    value: "vn"
    },
    {
      label: <DarkModeOutlinedIcon/>,
      value: "jp"
    },
    {
      label: <DarkModeOutlinedIcon/>,
      value: "en"
    },
  ];
const SelectLanguages = () => {

  return (
      <Select
      onChange={(e)=>console.log('e', e.target.value)}
        // displayEmpty
        // renderValue={(value) => {
        //   console.log(value);
        //   return (
        //     <Box sx={{ display: "flex", gap: 1 }}>
        //       {value}
        //     </Box>
        //   );
        // }}
      >
        {currencies.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
  )
}

export default SelectLanguages