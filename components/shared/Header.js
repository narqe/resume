import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_USER } from '../../GraphQL/Queries/Authentication';
import { AiOutlinePoweroff } from '@react-icons/all-files/ai/AiOutlinePoweroff';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const Header = ({ children }) => {
    const router = useRouter();
    const { t, i18n } = useTranslation();
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
            <div className='sm:flex justify-between mb-6'>
                <p>{ t('WELCOME', { name }) }</p>
                <div className='flex gap-5'>
                    <button 
                        type='button' 
                        className="cursor-pointer bg-red-600 w-full py-1 px-2 text-white rounded text-xs text-red-900 font-bold border-2 border-red-800" 
                        onClick={() => i18n.changeLanguage('es')}>
                        ES
                    </button>
                    <button 
                        onClick={() => logout()}
                        className="cursor-pointer bg-red-600 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"
                        type='button'>
                        <div className='flex align-middle'>
                            <AiOutlinePoweroff />  
                        </div>
                    </button>
                </div>
            </div>
            { children }
        </div>
    ) 
}

export default Header;