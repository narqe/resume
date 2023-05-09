import React, { useState, useEffect } from 'react';

const Toaster = (message, type) => {
    const [color, setColor] = useState(null);

    useEffect(() => {
        switch (type) {
            case 'info':
                setColor('blue')
            break

            case 'warning':
                setColor('yellow')
            break

            default:
                setColor('red')
            break;
        }
    }, [type]);

    return (
        message && <div className={'bg-'+color+'-100 h-16 w-80 absolute py-1 px-3 rounded-r-lg content-center flex flex-wrap text-center bottom-5 left-0 align-text-middle font-bold my-1'}>   
            <p className={'text-'+color+'-600'}>
                { message } 
            </p>
        </div>
    )
}

export default Toaster;