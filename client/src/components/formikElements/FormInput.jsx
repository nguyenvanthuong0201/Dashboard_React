import React from 'react'
import { Trans,useTranslation } from 'react-i18next'
import { ErrorMessage, Field, useField } from 'formik'
import useDeviceDetect from '../../helper/useDeviceDetect'


const FormikInput = (props) => {
    const [field, meta, helpers] = useField(props)
    const mobile = useDeviceDetect();

    return (
        <input
          disabled={props.disabled}
          className='wavy-input w-full'
          type={(props.type === 'number' && !mobile) ? 'text' : props.type}
          min={props.min}
          max={props.max}
          value={field.value}
          maxLength={props.maxLength?props.maxLength:null}
          readOnly={props.readOnly}
          onChange={(e) => {
            const value =
              props.type === 'number'
                ? mobile? parseFloat(e.target.value.replace(/[,.]/g, '')):parseFloat(e.target.value.replace(/[,.]/g, '')).toLocaleString(
                    'en-US'
                  )
                : e.target.value
            helpers.setTouched(true,true)
            helpers.setValue(value)
          }}
        />
    )
  }

const FormInput = (props) => {
    const {
        children,
        name,
        type,
        id,
        transKey,
        required,
        min,
        max,
        readOnly = false,
        maxLength,
        disabled
    } = props
    const { t, i18n } = useTranslation()
    return (
        <div>
            {transKey && (
                <label htmlFor={name}>
                    <Trans i18nKey={transKey} />
                    &nbsp;&nbsp;
                    {required && <span className='text-red-500'>*</span>}
                </label>
            )}
            <div className={children ? 'input-with-icon' : ''}>
                <Field className='w-full wavy-input' id={id} name={name}>
                    {() => (
                        <FormikInput
                            disabled={disabled}
                            maxLength={maxLength}
                            type={type}
                            min={min}
                            max={max}
                            name={name}
                            readOnly={readOnly}
                            language={i18n.language}
                        />
                    )}
                </Field>
                {children}
            </div>
            <ErrorMessage
                name={name}
                component='div'
                className='error-label'
                render={(message) => (
                    <div className='error-message'>{t(message)}</div>
                )}
            />
        </div>
    )
}

export default FormInput