/**
 *   Utilieria para cualquier caso
 **/

/**
 * Validar formulario
 * @param {Object} inputData
 * @param {*} minLenght
 * @returns true or false
 */
export const minLengthValidation = (inputData, minLength) => {
  const { value } = inputData;

  //Reseteamos la etiqueta HTML
  removeClassErrorSuccess(inputData);

  if (value.length >= minLength) {
    inputData.classList.add("success");
    return true;
  } else {
    inputData.classList.add("error");
    return false;
  }
};

/**
 * Valida email con una expresion regular
 * @param {Object} inputData
 * @returns {boolean}
 */
export const validateEmail = (inputData) => {
  const emailValid =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  const { value } = inputData;

  removeClassErrorSuccess(inputData);

  const resultValidation = emailValid.test(value);

  if (resultValidation) {
    inputData.classList.add("success");
    return true;
  } else {
    inputData.classList.add("error");
    return false;
  }
};

const removeClassErrorSuccess = (inputData) => {
  inputData.classList.remove("success");
  inputData.classList.remove("error");
};
