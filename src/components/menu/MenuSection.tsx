import ContactData from './ContactData';
import Header from './Header';
import Navbar from './Navbar/Navbar';
import './menu.css';

const MenuSection = () => {
    return (
        <header className="menu-container" id="menu">
            <Header />
            <Navbar />
            <ContactData />
        </header>
    )
}

export default MenuSection