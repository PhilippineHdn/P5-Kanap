const REGEX = {
    FIRST_NAME: /^[a-zA-Zéçàèùêïë]+$/,
    LAST_NAME: /^[a-zA-Zéçàèùêïë]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
    ADDRESS: /^[a-zA-Zéçàèùêïë0-9\s,'-]*$/,
    CITY: /^[a-zA-Zéçàèùêïë\s]+$/,
    EMAIL: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
}

export default class regexValidator {
    static firstName(firstName) { 
        return REGEX.FIRST_NAME.test(firstName)
    }
    static lastName(lastName) { 
        return REGEX.LAST_NAME.test(lastName)
    }
    static address(address) { 
        return REGEX.ADDRESS.test(address)
    }
    static city(city) { 
        return REGEX.CITY.test(city)
    }
    static email(email) { 
        return REGEX.EMAIL.test(email)
    }
}

// line 28 & 29 to use when we use a non static class/method
// const myValidator = new regexValidator()
// myValidator.validateFirstName('philippine')

//this line when it's a static class/method
// regexValidator.validateFirstName()



