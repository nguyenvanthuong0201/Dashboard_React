import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";
import SelectLanguages from "./SelectLanguages";
import { Avatar, Divider, IconButton } from "@mui/material";
import MenuHeader from "./MenuHeader";

const Navbar = ({ user }) => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${styles.paddingX
        } w-full flex items-center py-5 fixed top-0 z-20 ${scrolled ? "bg-primary" : "bg-transparent"
        }`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt='logo' className='w-full h-9 object-contain' />
        </Link>

        <ul className='list-none hidden sm:flex flex-row gap-6 items-center'>
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${active === nav.title ? "text-white" : "text-secondary"
                } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
          <li className="flex items-center">
            <SelectLanguages />
          </li>
          {user ? (<li className="flex items-center">
            <IconButton
              onClick={handleClick}
              size="small"
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }} alt="Remy Sharp" src="./user.png" />
            </IconButton>
            <MenuHeader anchorEl={anchorEl} open={open} handleClose={handleClose} />
          </li>) : (
            <li className="flex items-center">
              <button type='button' onClick={() => navigate('/login')}
                className='button-link py-3 px-3 rounded outline-none w-24 text-white '
              >
                Signin
              </button>
            </li>
          )}

        </ul>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className='w-[28px] h-[28px] object-contain'
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${!toggle ? "hidden" : "flex"
              } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${active === nav.title ? "text-white" : "text-secondary"
                    }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
              <li >
                <SelectLanguages />
              </li>
              {user ? (<>
                <li>
                  <button type='button' onClick={() => navigate('/admin')}
                    className='button-link py-3  px-4 rounded outline-none w-32 text-white '
                  >
                    Dashboard
                  </button>
                </li>
                <li>
                  <button type='button' style={{background:"gray"}} onClick={() => navigate('/admin')}
                    className='button-link  py-3  px-4 rounded outline-none w-32 text-white '
                  >
                    logout
                  </button>
                </li>
              </>

              ) : (
                <li>
                  <button type='button' onClick={() => navigate('/login')}
                    className='button-link py-3  px-4 rounded outline-none w-24 text-white '
                  >
                    Signin
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;