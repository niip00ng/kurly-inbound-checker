import AsyncStorage from '@react-native-async-storage/async-storage';

export function getItem<T>(key: string): Promise<T | undefined> {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(key, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      if (!result || result === null) {
        resolve(undefined);
        return;
      }

      resolve(JSON.parse(result));
    });
  });
}

export function setItem<T>(key: string, value: T): Promise<boolean> {
  return new Promise((resolve, reject) => {
    AsyncStorage.setItem(key, JSON.stringify(value), err => {
      if (err) {
        reject(err);
        return;
      }

      resolve(true);
    });
  });
}
