const storage = window.localStorage

export const setItem = (key, value) => {
  try {
    storage.setItem(key, value)
  } catch (e) {
    console.log(e)
  }
}

export const getItem = (key, defaultValue) => {
  try {
    const storageValue = storage.getItem(key)

    if (storageValue) {
      return JSON.parse(storageValue)
    }

    return defaultValue
  } catch (e) {
    console.log(e)
    return defaultValue
  }
}
