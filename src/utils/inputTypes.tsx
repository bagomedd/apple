export interface inputTypesInterface {
    [inputType: string]: string;
}
/**
 * @example EMAIL, USERNAME, PASSWORD, CONFIRM_PASSWORD
 */
export const inputTypes: inputTypesInterface = {
    EMAIL: "EMAIL",
    USERNAME: "USERNAME",
    PASSWORD: "PASSWORD",
    CONFIRM_PASSWORD: "CONFIRM_PASSWORD",
}