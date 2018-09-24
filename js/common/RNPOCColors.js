const namedColors = {
  black: "#000",
  white: "#fff",

  lightBlue: "#0ee",
  darkBlue: "#0a0a22",

  darkGray: "#242834",
  darkGray2: "#243345",

  lightGray:"#eeeeee"
};

export default {
  ...namedColors,

  tabBackgroundColor: namedColors.darkGray,
  tabColor: namedColors.white,
  tabUnderlayColor: namedColors.darkGray2,
  contentBackgroundColor: namedColors.darkBlue
};
