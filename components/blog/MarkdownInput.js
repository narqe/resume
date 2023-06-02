import React from 'react';
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from 'next/dynamic';
import InputFieldError from '@components/shared/Inputs/InputFieldError';
import { useTranslation } from 'react-i18next';

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);

const MarkdownInput = ({ value, label, formik }) => {
    const { t } = useTranslation();

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
            <div className="my-2 bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 break-all">
                <p className="font-bold">{t('MESSAGES.INFO.CONTENT_LABEL')}</p>
            </div>
        </>
    )
}

export default MarkdownInput