// import { useState } from "react";

interface RegistrationErrorInterface {
    type: string;

    inputValue: string;
    secInputValue?: string;
    ref?: any;
}

/** 
 * @param type "email","username" or "password"
 * @returns zxc
*/
export function RegistrationError({ type, inputValue, secInputValue }: RegistrationErrorInterface) {
    let error = "";

    console.log(secInputValue);
    if (type == "email") {
        if (inputValue.includes("@")) {
            error = "sobaka";
        }
    };

    return (
        <div>
            {error}
        </div>
    );
}