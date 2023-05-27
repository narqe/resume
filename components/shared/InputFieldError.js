import React from 'react';

const errorMessageValidator = (field, formik) => {
    return (formik.touched[field] && formik.errors[field] && 
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
            <p className="font-bold">Error: {formik.errors[field]} </p>
        </div>
    );
}

const InputFieldError = ({ formik, value }) => {
    return (
        formik && errorMessageValidator(value, formik)
    )
}

export default InputFieldError