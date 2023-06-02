import { useState, useEffect } from 'react';

const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });

    if(typeof window !== "undefined") {
        const { innerWidth: width, innerHeight: height } = window;
        useEffect(() => {
            const handleResize = () => setWindowDimensions({ width, height });
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, [width, height]);
    }
    return windowDimensions
}

export default useWindowDimensions