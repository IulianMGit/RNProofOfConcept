import { observable, action } from "mobx";

class ColorThemeStore {
  @observable
  theme = { color: "dark" };

  @action
  switch() {
    this.theme =
      this.theme.color === "dark" ? { color: "light" } : { color: "dark" };
  }
}

export default new ColorThemeStore();
