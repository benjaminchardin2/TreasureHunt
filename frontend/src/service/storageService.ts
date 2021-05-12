import moment from 'moment';

export const retrieveItemIfNotExpired = (storageKey: string) => {
  const objectStr = localStorage.getItem(storageKey);
  if (objectStr) {
    const object = JSON.parse(objectStr);
    if (moment().isBefore(object.expiry)) {
      return object.item;
    }
    localStorage.removeItem(storageKey);
  }
  return undefined;
};

export const setItemWithExpiry = (item: any, storageKey: string, hourDuration: number) => {
  const storageItem = {
    item,
    expiry: moment().add(hourDuration, 'hours'),
  };
  localStorage.setItem(storageKey, JSON.stringify(storageItem));
};
