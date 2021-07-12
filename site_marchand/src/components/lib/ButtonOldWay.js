import React from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

function Button({ title, variant, theme, ...rest }) {
  const style = {};
  if (variant === "rounded") style.borderRadius = "50%";
  return (
    <ThemeContext.Consumer>
      {({ theme }) => {
        style.color = theme === "dark" ? "white" : "black";
        style.backgroundColor = theme === "dark" ? "black" : "white";
        return (
          <button {...rest} style={style}>
            {title.toString()}
          </button>
        );
      }}
    </ThemeContext.Consumer>
  );
}

export default Button;
