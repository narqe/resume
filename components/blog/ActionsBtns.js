import React from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { DELETE_BLOG } from '@graphql/Mutations/Blog';
import Swal from 'sweetalert2';
import { GET_BLOGS } from '@graphql/Queries/Blog';
import { useMutation } from '@apollo/client';

const ActionsBtns = ({ id }) => {
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

    const editPost = () => {
        Router.push({
            pathname: `/admin/edit-article/[id]`,
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
    )
}

export default ActionsBtns