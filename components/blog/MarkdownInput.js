import React from 'react';
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from 'next/dynamic';
import InputFieldError from '@components/shared/Inputs/InputFieldError';

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);

const MarkdownInput = ({ value, label, formik }) => {
    return (
        <>
            <label 
                className="block text-gray-700 text-sm font-bold mb-2" 
                htmlFor={value}>
                { label }
            </label>
            <MDEditor 
                id={value} 
                value={formik && formik.values[value]} 
                onChange={(e) => formik && formik.setFieldValue(value, e)} 
            />
            <InputFieldError value={value} formik={formik} />
        </>
    )
}

export default MarkdownInput