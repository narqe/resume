import { useTranslation } from 'react-i18next';
import NavBarItem from './NavbarItem';
import { MENU_ITEMS } from './menu-items';

const Navbar = () => {
    const { t, i18n } = useTranslation();

    return (
        <nav className="navbar-container">
            <ul className="leftside-container__nav-ul">
                {MENU_ITEMS.map(item => (
                    <NavBarItem key={item.href} href={item.href} title={t(item.title)} />
                ))}
            </ul>
        </nav>
    )
}

export default Navbar