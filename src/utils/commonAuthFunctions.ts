import { inputTypesInterface, toInputKey } from "./inputTypes";
import { cssColors } from "./cssVariables";

export interface inputElementsInterface { [inputType: string]: HTMLInputElement; };
export interface inputValuesInterface { [inputType: string]: string; };

export function showPassword(passwordElement: HTMLInputElement, confirmPasswordElement: HTMLInputElement | null, passwordButton: HTMLElement) {
    passwordElement.type = "visiblePassword";
    if (confirmPasswordElement) {
        confirmPasswordElement.type = "visiblePassword";
    };
    if (passwordButton) {
        passwordButton.style.backgroundColor = "" + cssColors['--blue-c2'];
    };
}
export function hidePassword(passwordElement: HTMLInputElement, confirmPasswordElement: HTMLInputElement | null, passwordButton: HTMLElement) {
    passwordElement.type = "password";
    if (confirmPasswordElement) {
        confirmPasswordElement.type = "password";
    };
    if (passwordButton) {
        passwordButton.style.backgroundColor = "" + cssColors['--blue-c1'];
    };
}
export function inputFocusHandler(inputType: string, errors: inputTypesInterface, inputElements: inputElementsInterface) {
    let type = inputType;

    if (errors[toInputKey(type)!] == '') {
        inputElements[type].style.outline = "3px solid" + cssColors['--blue-c1'];
    }
    else {
        inputElements[type].style.outline = "3px solid" + cssColors['--red-c1'];
    }
}
export function inputBlurHandler(inputType: string, errors: inputTypesInterface, inputElements: inputElementsInterface) {
    let type = inputType;

    if (errors[type] == '') {
        inputElements[type].style.outline = "0px solid" + cssColors['--blue-c1'];
    }
    else {
        inputElements[type].style.outline = "0px solid" + cssColors['--red-c1'];
    }
}
export function deactivateSubmitButton(buttonElement: HTMLButtonElement) {
    buttonElement.style.backgroundColor = cssColors['--gray-c1'];
    buttonElement.onclick = null;
}
export function activateSubmitButton(buttonElement: HTMLButtonElement, submitHandler: (event: MouseEvent) => void) {
    buttonElement.style.backgroundColor = cssColors['--blue-c1'];
    buttonElement.onclick = submitHandler;
}
export function openLoginWindow(contentWindow: HTMLDivElement) {
    contentWindow.style.marginTop = "-640px";
}
export function openRegisterWindow(contentWindow: HTMLDivElement) {
    contentWindow.style.marginTop = "0px";
}
/**
 * @returns String-view error
 */
export async function sendInfo(API: string, emailValue: string, usernameValue: string, passwordValue: string) {
    let json_info = JSON.stringify({
        "email": emailValue,
        "username": usernameValue,
        "password": passwordValue
    })

    try {
        let response = await fetch(API, {
            // mode: 'no-cors',
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: json_info,
            signal: AbortSignal.timeout(3000)
        });
    }
    catch {
        return 'There is some troubles, please, try later';
    }
}