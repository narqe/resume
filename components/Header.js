import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_USER } from '../GraphQL/Queries';
import { AiOutlinePoweroff } from '@react-icons/all-files/ai/AiOutlinePoweroff';
import { useRouter } from 'next/router';

const Header = ({ children }) => {
    const router = useRouter();
    const { data, loading } = useQuery(GET_USER);
    const logout = () => {
        localStorage.removeItem('token');
        router.push('/login')
    }

    if (loading) return null;
    if (!data.getUser) {
        return router.push('/login')
    };

    const { name } = data.getUser;

    return (
        <div className="bg-gray-300 p-5">
            <div className='flex justify-between mb-6'>
                <p>Hola, { name }</p>
                <button 
                    onClick={() => logout()}
                    className="cursor-pointer bg-red-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"
                    type='button'>
                    <div className='flex align-middle'>
                        <AiOutlinePoweroff />  
                    </div>
                </button>
            </div>
            { children }
        </div>
    ) 
}

export default Header;