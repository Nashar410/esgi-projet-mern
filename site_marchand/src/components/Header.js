import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import Button from "./lib/Button";
import ButtonOldWay from "./lib/ButtonOldWay";
import { Link } from "react-router-dom";

function Header() {
  const { toggleTheme } = useContext(ThemeContext);
  return (
    <nav>
      <ButtonOldWay onClick={toggleTheme} title="Change Theme" />
      <Button onClick={toggleTheme} title="Change Theme 3" />
      <Link to="/">Home</Link>
      <Link to="/account">Account</Link>
    </nav>
  );
}

export default Header;
