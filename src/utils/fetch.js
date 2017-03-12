/*
  * Get value from nested object
  *
  * @param {obj} object Object to get value from
  * @param {keyLists} array List of nested field to navigate
  * @param {defaultValue} any
  *
  * @return {value} any
  *
  */
export function getValue(obj = {}, keyLists = [], defaultValue) {
  let cp = Object.assign({}, obj);
  let value;
  keyLists.forEach((key, index) => {
    if (index < keyLists.length - 1) {
      cp = cp ? cp[key] : {};
    } else {
      value = cp ? cp[key] : undefined;
    }
  });
  if (!value) {
    return defaultValue;
  } else {
    return value;
  }
}

/*
  * Get partial data from object
  * Return data obj and errors if missing
  *
  * @param {obj} object Object to get data from
  * @param {keys} array Fields in object to get partial object
  *
  * @return { {errors, data} } { arrays, object }
  *
  */
export function getData(obj, keys) {
  const errors = [];
  const data = {};
  keys.forEach(key => {
    if (!obj[key] && typeof obj[key] !== 'boolean') {
      errors.push({ fieldName: key, message: `${key.formalize()} is required.` });
    } else {
      data[key] = obj[key];
    }
  });
  return { errors, data };
}

/*
  * Get error from fieldErrors in array by fieldName
  *
  * @param {errors} array Array of error object with { fieldName, message }
  * @param {key} string Field name to get error message
  *
  */
export function getError(errors = [], key) {
  const error = errors.find(ele => ele.fieldName === key);
  if (error) return error.message;
  return null;
}
