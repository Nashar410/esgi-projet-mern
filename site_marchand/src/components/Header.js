import React from "react";
import {Link} from "react-router-dom";

function Header() {

    const buttonStyle = 'w3-bar-Item w3-button';
    return (
        <nav className={'w3-bar w3-blue-grey'}>
            <Link className={buttonStyle} to="/">Accueil</Link>
            <Link className={buttonStyle} to="/panier">Panier</Link>
        </nav>
    );
}

export default Header;
