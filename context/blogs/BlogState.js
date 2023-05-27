import React, { useReducer } from "react";
import BlogContext from "./BlogContext";
import BlogReducer from "./BlogReducer";
import { SET_COVER_IMAGE } from '../../types';

const BlogState = ({ children }) => {
    const initialState = {
        coverImage: null
    }

    const [ state, dispatch ] = useReducer(BlogReducer, initialState)

    const setCoverImage = image => {
        dispatch({
            type: SET_COVER_IMAGE,
            payload: image
        })
    }

    return (
        <BlogContext.Provider value={{
            coverImage: state.coverImage,
            setCoverImage
        }}>
            { children }
        </BlogContext.Provider>
    );
}

export default BlogState;
