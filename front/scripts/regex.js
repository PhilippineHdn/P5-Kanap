const regexFirstName = /^[a-zA-Z]+$/;
const regexLastName = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
const regexAddress = /^[a-zA-Z0-9\s,'-]*$/;
const regexCity = /^[a-zA-Z\s]+$/;
const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/


const validateFirstName = (name) => regexFirstName.test(name);

const validateLastName = (name) => regexLastName.test(name);

const validateAddress = (address) => regexAddress.test(address);

const validateCity = (city) => regexCity.test(city);

const validateEmail = (email) => regexEmail.test(email);

export {
    validateFirstName,
    validateLastName,
    validateAddress,
    validateCity,
    validateEmail,
}





