
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '@/utils/changeLanguage';

const Header = () => {
    const { i18n } = useTranslation();

    return (
        <>
            <figure className="profile-img">
                <img src="img/foto.jpg" alt="Joel Acef" title="Joel Acef" width="200" />
            </figure>
            <h1 className="name-title">Joel Acef</h1>
            <h2 className="subtitle">SR Front-End Developer</h2>
            <div className="mobile-menu">
                <a href="#menu" title="Menu" className="menu"></a>
                <div
                    onClick={() => changeLanguage(i18n)} 
                    className={i18n.language === 'es' ? 'en' : 'es'}
                >
                </div>
            </div> 
        </>
    )
}

export default Header;