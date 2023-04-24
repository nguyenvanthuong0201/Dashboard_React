import React, { useState } from "react";
import { styles } from "../../styles";
import { motion } from "framer-motion";
import { Navbar } from "../../components";
import FormInput from "../../components/formikElements/FormInput";
import { useTranslation } from "react-i18next";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { t } = useTranslation()

  return (
    <section
      className={`relative w-full h-screen mx-auto bg-hero-pattern bg-cover bg-no-repeat bg-center`}
    >
      {/* <Navbar /> */}
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 `}
      >
        <div className="bg-slate-900 flex w-full min-h-[450px] lg:min-h-[600px] rounded-2xl">
          <div className="w-3/5 bg-gray-500 hidden sm:block rounded-l-2xl m-5 rounded-2xl ">
            gird 1
          </div>
          <div className="w-full sm:w-2/5  rounded-2xl sm:rounded-none sm:rounded-r-2xl m-5 ">
            <div className="text-center mt-4">
              <p className="w-full">Welcome</p>
              <h1 className="w-full mt-2">Sign in now</h1>
            </div>
            <div className="w-full mt-5">
              <FormInput
                name='email'
                type='email'
                id='email'
                transKey='email'
                required={true}
              />
            </div>
            <div className="w-full">
              <FormInput
                name='password'
                type={showPassword ? 'text' : 'password'}
                id='password'
                transKey='password'
                required={true}
              >
                {showPassword ? (
                  <VisibilityIcon
                    onClick={() => setShowPassword(!showPassword)}
                    className='inner-icon h-5 w-5 text-gray-500'
                  />
                ) : (
                  <VisibilityOffIcon
                    onClick={() => setShowPassword(!showPassword)}
                    className='inner-icon h-5 w-5 text-gray-500'
                  />
                )}
              </FormInput>
            </div>
            <div className="w-full">
              <button>submit</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
