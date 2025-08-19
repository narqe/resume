const NavBarItem = ({ href, title }) => {
    return (
        <li className="leftside-container__nav-li">
            <a className="leftside-container__nav-link" href={`#${href}`} title={title}>{title}</a>
        </li>
    )
}

export default NavBarItem;