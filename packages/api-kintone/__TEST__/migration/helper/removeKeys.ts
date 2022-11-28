export const removeKeys = (obj: unknown, keys: string[]) => {
  if (Array.isArray(obj)) return obj.map(item => removeKeys(item, keys));

  if (typeof obj === 'object' && obj !== null) {
    return Object.keys(obj).reduce((previousValue, key) => {
      return keys.includes(key) ? previousValue : { ...previousValue, [key]: removeKeys(obj[key], keys) };
    }, {});
  }

  return obj;
};