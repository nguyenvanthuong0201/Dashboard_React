import { Typography, Box, useTheme } from "@mui/material";

const Header = ({ title, subtitle }) => {

  return (
    <Box >
      <Typography
        variant="h5"
        className="text-slate-900 dark:text-white font-bold"
      >
        {title}
      </Typography>
      <Typography className="text-slate-900 dark:text-white text-sm  mb-2">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;