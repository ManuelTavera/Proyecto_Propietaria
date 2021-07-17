export const loadAuthUser = () => {
  try {
    const serializedState = localStorage.getItem("authUser");
    if (serializedState === null) {
      return null;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return null;
  }
};

export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.log(`Error trying to delete ${key} from local storage`);
    console.log("Error: ", key);
  }
};

export const saveToLocalStorage = (key, data) => {
  try {
    const serializedState = JSON.stringify(data);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    // Ignored write errors
    console.log("Key: ", key);
    console.log("Error: ", err);
  }
};
