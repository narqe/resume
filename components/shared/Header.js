import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_USER } from '../../GraphQL/Queries/Authentication';
import { AiOutlinePoweroff } from '@react-icons/all-files/ai/AiOutlinePoweroff';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import Loading from './Loading';
import ErrorCustomTableResults from './ErrorCustomTableResults';

const Header = ({ children }) => {
    const router = useRouter();
    const { t, i18n } = useTranslation();
    const { data, loading, error } = useQuery(GET_USER);
    
    const logout = () => {
        localStorage.removeItem('token');
        router.push('/login')
    }

    if (loading) return <Loading />;

    if (error) return <ErrorCustomTableResults />;

    return (
        <>
            <div className='sm:flex justify-end gap-10 px-10 py-1 bg-gray-900 text-white'>
                <p>{ t('WELCOME', data?.getUser) }</p>
                <div className='flex gap-5'>
                    <button 
                        type='button' 
                        className="cursor-pointer bg-red-600 w-full py-1 px-2 rounded text-xs text-red-900 font-bold border-2 border-red-800" 
                        onClick={() => i18n.changeLanguage('es')}>
                        ES
                    </button>
                    <button 
                        onClick={() => logout()}
                        className="cursor-pointer bg-red-600 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 shadow-md"
                        type='button'>
                        <div className='flex align-middle'>
                            <AiOutlinePoweroff />  
                        </div>
                    </button>
                </div>
            </div>
            { children }
        </>
    ) 
}

export default Header;