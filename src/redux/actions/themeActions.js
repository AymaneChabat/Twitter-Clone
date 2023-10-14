export const setBtnColor = (color) => {
    return {
      type: "SET_COLOR",
      payload: color,
    };
  };
  
  export const setTheme = (theme) => {
    return {
      type: "SET_THEME",
      payload: theme,
    };
  };
  