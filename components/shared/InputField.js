import React from 'react';
import { useTranslation } from 'react-i18next';

const InputField = ({ label, type = 'text', placeholder, value, formik }) => {
    const { t } = useTranslation();
    const errorMessageValidator = (field) => {
        return (
            (formik.touched[field] && formik.errors[field]) &&
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error: {formik.errors[field]} </p>
            </div>
        );
    }

    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={value}>
                { t(label) }
            </label>
            <input 
                className="shadow appearance-none border rounder w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={value}
                type={type}
                placeholder={t(placeholder)} 
                value={formik && formik.values[value]}
                onChange={formik && formik.handleChange}
                onBlur={formik && formik.handleBlur}
            />
            { formik && errorMessageValidator(value) }
        </div>
    )
}
    
export default InputField;