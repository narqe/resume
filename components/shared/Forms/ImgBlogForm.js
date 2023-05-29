import React, { useContext } from 'react';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UPLOAD_FILE } from '@graphql/Mutations/File';
import SubmitBtn from '@components/shared/Inputs/SubmitBtn';
import BlogContext from '@context/blogs/BlogContext';

const ImgBlogForm = () => {
    const blogContext = useContext(BlogContext);
    const { coverImage, setCoverImage } = blogContext;
    const { t } = useTranslation();
    const [ uploadFile ] = useMutation(UPLOAD_FILE);
    const formik = useFormik({
        initialValues: {
            file: ''
        },
        validationSchema: Yup.object({ 
            file: Yup.string().required(t('INPUT_ERRORS.REQUIRED')),
        }),
        onSubmit: (values) => onUploadFile(values.file)
    })

    const onUploadFile = async values => {
        try {
            const { name, size, type } = values;
            const { data } = await uploadFile({ 
                variables: {
                    input: {
                        name,
                        size,
                        type
                    }
                } 
            });
            setCoverImage(data.uploadFile.url)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form 
            onSubmit={formik.handleSubmit} 
            encType='multipart/form-data' 
            className='md:my-8'>
            <img
                src={coverImage} 
                height={'100%'} 
                width={'100%'}
            />
            <input 
                className='appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type="file" 
                id="file" 
                name="file" 
                accept="image/*"
                onChange={(e) => formik.setFieldValue('file', e.currentTarget.files[0])}
            />
            <p className='break-words'>URL: { coverImage || '-'}</p>
            <SubmitBtn value={t('BUTTONS.UPLOAD_PHOTO')} />
        </form>
    )
}

export default ImgBlogForm