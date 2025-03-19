import { inputTypes } from "./inputTypes";

export function validateRegistration(type: string, inputValue: string) {
    let error = "";
    // VALIDATE EMAIL
    if (type == inputTypes.EMAIL) {
        if (!inputValue.includes("@")) {
            error = "There's not correct email format";
        }
    }

    //VALIDATE USERNAME
    if (type == inputTypes.USERNAME) {

        if (inputValue.length < 4) {
            error = "Username must be longer than 4 symbols";
        }
        else if (inputValue.length > 25) {
            error = "Username must be shorter than 25 symbols";
        }
    }

    //VALIDATE PASSWORD
    if (type == inputTypes.PASSWORD) {
        if (inputValue.length < 6) {
            error = "Password must be longer than 6 symbols";
        }
        else if (inputValue.length > 30) {
            error = "Password must be shorter than 30 symbols";
        }
    }

    return error;
}

export function validatePasswordsEquality(password: string, confirmPassword: string) {
    let error = '';

    if (password != confirmPassword) {
        error = "Passwords must be the same"
    }
    return error;
}