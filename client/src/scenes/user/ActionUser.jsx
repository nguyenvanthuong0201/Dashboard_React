import { Drawer, IconButton, Typography } from '@mui/material'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useState } from 'react'
import FormInput from '../../components/formikElements/FormInput';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PhotoCamera from '@mui/icons-material/PhotoCameraOutlined';
import * as Yup from "yup";
import { useTranslation } from 'react-i18next';
import { useRegisterUser } from '../../queries/useUser';


const ActionUser = ({ openDrawer, setOpenDrawer, isEdit }) => {

    const { mutate: registerUser } = useRegisterUser();
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
    const [avatarPreview, setAvatarPreview] = useState("/user.png");
    const { t } = useTranslation()

    const RegisterSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        workName: Yup.string().required('Work name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
        passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'passwordNotMatch')
    });

    const handleDataImage = (e, setFieldValue) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setFieldValue('avatar', reader.result);
                setAvatarPreview(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    }

    const handleSubmitForm = (values) => {
        registerUser({...values},{
            onSuccess:(data)=>{
              queryClient.setQueryData(['registerUser'], data)
            },
            onError: (error) => {
              console.log('error', error)
            }
          })
    }


    return (
        <Drawer
            anchor={'right'}
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
        >
            <div className='min-w-[400px] min-h-screen h-full  bg-gray-100 dark:bg-slate-800'>
                <div className='p-5  bg-gray-100 text-slate-800 dark:text-white dark:bg-slate-800'>
                    <Typography
                        variant="h5"
                        className="text-slate-900 dark:text-white font-bold"
                    >
                        Create user
                    </Typography>
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            password: '',
                            passwordConfirmation: '',
                            workName: '',
                            avatar: '',
                        }}
                        validationSchema={RegisterSchema}
                        validateOnBlur={true}
                        validateOnChange={true}
                        onSubmit={(values) => handleSubmitForm(values)}

                    >
                        {({ setFieldValue, dirty, isValid }) => {
                            return (
                                <Form>
                                    <div className="w-full mt-5 flex justify-center" >
                                        <label htmlFor="icon-button-file" className='text-center'>
                                            <img
                                                alt="profile-user"
                                                className='rounded-full w-32 h-32 object-cover border-2 p-1 border-[#10b6cf]'
                                                src={avatarPreview}
                                            />
                                            <input name="avatar" style={{ display: 'none' }} accept="image/*" id="icon-button-file" type="file" onChange={(e) => handleDataImage(e, setFieldValue)} />
                                            <IconButton color="primary" aria-label="upload picture" component="span">
                                                <PhotoCamera className='text-wavy-500' />
                                            </IconButton>
                                        </label>
                                    </div>
                                    <div className="w-full mt-2">
                                        <FormInput
                                            name='name'
                                            type='text'
                                            id='name'
                                            transKey='name'
                                            required={true}
                                        />
                                        <FormInput
                                            name='email'
                                            type='email'
                                            id='email'
                                            transKey='email'
                                            required={true}
                                        />
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
                                                    className='inner-icon h-5 w-5 !text-slate-900 dark:!text-white'
                                                />
                                            ) : (
                                                <VisibilityOffIcon
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className='inner-icon h-5 w-5 !text-slate-900 dark:!text-white'
                                                />
                                            )}
                                        </FormInput>

                                        <FormInput
                                            name='passwordConfirmation'
                                            type={showPasswordConfirm ? 'text' : 'password'}
                                            id='passwordConfirmation'
                                            transKey='passwordConfirmation'
                                            required={true}
                                        >
                                            {showPasswordConfirm ? (
                                                <VisibilityIcon
                                                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                                                    className='inner-icon h-5 w-5 !text-slate-900 dark:!text-white'
                                                />
                                            ) : (
                                                <VisibilityOffIcon
                                                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                                                    className='inner-icon h-5 w-5 !text-slate-900 dark:!text-white'
                                                />
                                            )}
                                        </FormInput>
                                        <FormInput
                                            name='workName'
                                            type='text'
                                            id='workName'
                                            transKey='workName'
                                            required={true}
                                        />
                                    </div>
                                    <div className="w-full flex justify-center">
                                        <button type='submit' disabled={!(isValid && dirty)}
                                            className={(!(isValid && dirty) && 'opacity-70 !cursor-auto') + ' button-link my-4 rounded-xl outline-none w-40 text-white font-bold'}
                                        >
                                            Create
                                        </button>
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
            </div>
        </Drawer>
    )
}

export default ActionUser