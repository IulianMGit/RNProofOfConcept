import { observable, action } from "mobx";

class ColorThemeStore {
  _darkTheme = "dark";

  _lightTheme = "light";

  @observable
  theme = "dark";

  @action
  switch() {
    this.theme =
      this.theme === this._darkTheme ? this._lightTheme : this._darkTheme;
    console.log("color", this.theme);
  }
}

export default ColorThemeStore;
