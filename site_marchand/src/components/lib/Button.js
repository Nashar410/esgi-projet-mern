import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

function Button({ title, variant, theme: _, ...rest }) {
  const { theme } = useContext(ThemeContext);

  const style = {};
  if (variant === "rounded") style.borderRadius = "50%";
  style.color = theme === "dark" ? "white" : "black";
  style.backgroundColor = theme === "dark" ? "black" : "white";

  return (
    <button {...rest} style={style}>
      {title.toString()}
    </button>
  );
}

export default Button;
