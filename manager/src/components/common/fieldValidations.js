
/**required */
export const required = value => value ? undefined : 'Required';

/**EMAIL */
const _regex = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
export const emailValiadte = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Invalid email address' : undefined;

/**MOBILE */
export const mobileValidate = value =>
    value && !/^[0-9]\d{9}$/i.test(value) ?
        'Invalid mobile no. (must be of 10 digits)' : undefined;

/**MAXLENGTH */
const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined;
export const maxLengthValidate = maxLength(10);

/**MINLENGTH */
 const  minLength = min => value =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined;   
export const minLengthValidate = minLength(3);

/**MUST BE A NUMBER */
export const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;

/**STRONG PASSWORD */
export const password = value => value && !_regex.test(value) ?
    `length must be greater than or equal to 8,
     contain one or more uppercase characters,
     contain one or more lowercase characters
     contain one or more numeric values,
     contain one or more special characters(!@#$%^&*), ` : undefined;

/**Exist */
export const exist = value => (value !== "abhi") ? undefined : console.log('Username Already Exist', value);