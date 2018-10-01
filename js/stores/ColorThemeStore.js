import { observable, action } from "mobx";

class ColorThemeStore {
  _darkTheme = "dark";

  _lightTheme = "light";

  @observable
  theme = this._darkTheme;

  @action
  switch() {
    this.theme =
      this.theme === this._darkTheme ? this._lightTheme : this._darkTheme;
  }
}

export default ColorThemeStore;
