import React from 'react';
import { useTranslation } from 'react-i18next';
import InputFieldError from './InputFieldError';

const InputField = ({ label, type = 'text', placeholder, value, formik }) => {
    const { t } = useTranslation();

    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={value}>
                { t(label) }
            </label>
            { type === "textarea" ?   
                <textarea 
                    className="shadow appearance-none border rounder w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id={value}
                    type={type}
                    maxLength="500"
                    placeholder={t(placeholder)}
                    value={formik && formik.values[value]}
                    onChange={formik && formik.handleChange}
                    onBlur={formik && formik.handleBlur}
                >
                </textarea> :
                <input 
                    className="shadow appearance-none border rounder w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id={value}
                    type={type}
                    placeholder={t(placeholder)} 
                    value={formik && formik.values[value]}
                    onChange={formik && formik.handleChange}
                    onBlur={formik && formik.handleBlur}
                />
            }
            <InputFieldError value={value} formik={formik} />
        </div>
    )
}
    
export default InputField;