import React from 'react';
import Router from 'next/router';
import { useTranslation } from 'react-i18next'
import { MdOutlineReadMore } from 'react-icons/md';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { DELETE_BLOG, UPDATE_BLOG } from '../../GraphQL/Mutations/Blog';
import Swal from 'sweetalert2';
import { GET_BLOGS } from '../../GraphQL/Queries/Blog';
import { useMutation } from '@apollo/client';

const Footer = ({ id }) => {
    const { t } = useTranslation();
    const [ deleteBlog ] = useMutation(DELETE_BLOG, {
        update( cache ) {
            const { getBlogs } = cache.readQuery({ query: GET_BLOGS });
            cache.writeQuery({
                query: GET_BLOGS,
                data: {
                    getBlogs: getBlogs.filter(blogs => blogs.id !== id)
                }
            })
        }
    });

    const viewMoreDetail = () => {
        Router.push({
            pathname: `/view-article/[id]`,
            query: { 
                id 
            }
        })
    }

    const editPost = () => {
        Router.push({
            pathname: `/edit-article/[id]`,
            query: { 
                id 
            }
        })
    }

    const confirmDeleteBlog = () => {
        Swal.fire({
            title: t('MESSAGES.CONFIRMATION.ON_DELETE.TITLE', { ctx: t("CTX.BLOG") }),
            text: t('MESSAGES.CONFIRMATION.ON_DELETE.TEXT', { ctx: t("CTX.BLOG") }),
            icon: 'warning',
            iconColor: '#991b1a',
            showCancelButton: true,
            confirmButtonColor: '#154e3a',
            cancelButtonColor: '#991b1a',
            confirmButtonText: t('MESSAGES.CONFIRMATION.ON_DELETE.CONFIRMATION_BTN', { ctx: t("CTX.BLOG") }),
            cancelButtonText: t('MESSAGES.CONFIRMATION.ON_DELETE.CANCEL_BTN')
        }).then(async (result) => {
            if (result.value) {
                try {
                    const { data } = await deleteBlog({
                    variables: { id }
                })
                Swal.fire({
                    title: data.deleteBlog, 
                    text: t('MESSAGES.SUCCESS.ON_DELETE', { ctx: t("CTX.BLOG") }),
                    icon: 'success',
                    iconColor: '#154e3a',
                    showConfirmButton: false,
                    timer: 1500
                })
                } catch (error) {
                    console.log(error);
                }
            }
        })
    }

    return (
        <div className='flex justify-end items-center py-2 px-5 gap-5'>
            <button 
                className='bg-yellow-800 flex justify-center items-center gap-2 my-1 p-2 text-white text-sm rounded-lg uppercase hover:bg-yellow-700 cursor-pointer'
                onClick={() => viewMoreDetail(id)}
                type='button'>
                    <MdOutlineReadMore />
                    { t('BUTTONS.MORE_DETAILS') }
            </button>
            <div className="justify-end items-center flex">
                <button 
                    onClick={() => confirmDeleteBlog()}
                    className='lg:mt-1 sm:mt-4 text-red-800 text-md font-bold opacity-80 hover:opacity-80'>
                        <AiFillDelete className='ml-2' />
                </button>
                <button 
                    onClick={() => editPost(id)}
                    className='lg:mt-1 sm:mt-4 text-green-800 text-md font-bold opacity-80 hover:opacity-100'>
                        <AiFillEdit className='ml-2' />
                </button>
            </div>
        </div>
    )
}

export default Footer