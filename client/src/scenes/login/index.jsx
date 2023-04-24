import React, { useState } from "react";
import { styles } from "../../styles";
import { motion } from "framer-motion";
import { Navbar } from "../../components";
import FormInput from "../../components/formikElements/FormInput";
import { useTranslation } from "react-i18next";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { t } = useTranslation()

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(70, 'Too Long!')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
  });

  return (
    <section
      className={`relative w-full h-screen mx-auto bg-hero-pattern bg-cover bg-no-repeat bg-center`}
    >
      <Navbar />
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 `}
      >
        <div className="bg-slate-900 flex w-full min-h-[15rem] lg:min-h-[25rem] xl:min-h-[30rem] 2xl:min-h-[40rem] rounded-2xl">
          <div className="w-3/5 bg-gray-500 hidden sm:block rounded-l-2xl m-5 rounded-2xl ">
            gird 1
          </div>
          <div className="w-full sm:w-2/5  rounded-2xl sm:rounded-none sm:rounded-r-2xl m-5 ">
            <div className="text-center mt-4">
              
              <p className="w-full text-xs">Welcome</p>
              <h1 className="w-full text-lg sm:text-xl lg:text-2xl font-bold mt-2">Sign in now</h1>
            </div>
            <Formik
              initialValues={{
                name: '',
                email: '',
              }}
              validationSchema={SignupSchema}
              onSubmit={values => {
                console.log(values);
              }}
            >
              <Form>
                <div className="w-full mt-5">
                  <FormInput
                    name='email'
                    type='email'
                    id='email'
                    transKey='email'
                    required={true}
                  />
                </div>
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
                <div className="w-full flex justify-center">
                <button
                    type='submit'
                    className='button-link py-3 my-4 px-8 rounded-xl outline-none w-40 text-white font-bold'
                  >
                    Login
                  </button>
                </div>
              </Form>
            </Formik>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
