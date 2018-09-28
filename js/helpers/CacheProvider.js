import { AsyncStorage } from "react-native";

const registeredKeys = {
  lastVisitedSection: "lastVisitedSection"
};

const storeItem = async (key, item) => {
  if (registeredKeys[key]) {
    try {
      await AsyncStorage.setItem(registeredKeys[key], JSON.stringify(item));
    } catch (error) {
      //
    }
  }
};

const retrieveItem = async key => {
  if (registeredKeys[key]) {
    // hit
    const serializedResult = await AsyncStorage.getItem(registeredKeys[key]);

    return JSON.parse(serializedResult);
  }
  return null;
};

export { storeItem, retrieveItem, registeredKeys };
