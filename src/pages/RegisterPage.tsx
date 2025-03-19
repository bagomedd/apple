import { ChangeEvent, useState, useRef } from 'react';
import { validateRegistration } from "../Components/utils/validateRegistration";
import { inputTypes } from "../Components/utils/inputTypes";



export function RegisterPage() {
    const SEND_INFO_API = "http://192.168.1.221:8080/api/reg";

    const emailValue = useRef<string>('');
    const emailElement = useRef<HTMLInputElement | null>(null);
    const usernameValue = useRef<string>('');
    const usernameElement = useRef<HTMLInputElement | null>(null);
    const passwordValue = useRef<string>('');
    const passwordElement = useRef<HTMLInputElement | null>(null);
    const confirmPasswordValue = useRef<string>('');
    const confirmPasswordElement = useRef<HTMLInputElement | null>(null);

    let errorsInterface: { [propname: string]: string } = {};
    const [errors, setErrors] = useState(errorsInterface);
    // const [errors, setErrors] = useState({ email: "", username: "", password: "", confirmPassword: "" });

    const myobj: { [propname: string]: string } = {};



    function jsonConverter(emailValue: string, usernameValue: string, passwordValue: string) {
        return (
            JSON.stringify({
                "email": emailValue,
                "username": usernameValue,
                "password": passwordValue
            })
        );
    }
    async function sendInfo() {
        const json_info = jsonConverter(emailValue.current, usernameValue.current, passwordValue.current);

        fetch(SEND_INFO_API, {
            // mode: 'no-cors',
            "method": "POST",
            "headers": { "Content-type": "application/json" },
            "body": json_info
        });
    }
    function submitHandler() {

        emailValue.current = emailElement.current!.value;
        usernameValue.current = usernameElement.current!.value;
        passwordValue.current = passwordElement.current!.value;
        confirmPasswordValue.current = confirmPasswordElement.current!.value;
        let error = '';
        let isRejected = false;
        let errors = ['', '', '', ''];
        error = validateRegistration(inputTypes.EMAIL, emailValue.current)
        // setErrors({ ...errors, [inputTypes.EMAIL!]: error });
        if (error != '') {
            errors[0] = error;
            isRejected = true;
        }

        error = validateRegistration(inputTypes.USERNAME, usernameValue.current)
        // setErrors({ ...errors, [inputTypes.USERNAME!]: error });
        if (error != '') {
            errors[1] = error;
            isRejected = true;
        }


        error = validateRegistration(inputTypes.PASSWORD, passwordValue.current)
        if (error != '') {
            errors[2] = error;
            isRejected = true;
        }

        error = validateRegistration(inputTypes.CONFIRM_PASSWORD, passwordValue.current, confirmPasswordValue.current)

        if (error != '') {
            errors[3] = error;
            isRejected = true;
        }
        if (isRejected) {
            setErrors({
                email: errors[0],
                username: errors[1],
                password: errors[2],
                confirmPassword: errors[3]
            });
        }
        else {
            sendInfo();
        }
    }
    function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {

        let type = event.target.dataset.inputType;
        let inputValue = event.target.value;

        if (type == inputTypes.PASSWORD || type == inputTypes.CONFIRM_PASSWORD) {
            passwordValue.current = passwordElement.current!.value;
            confirmPasswordValue.current = confirmPasswordElement.current!.value;
            inputValue = passwordValue.current;

            let secondInputValue = confirmPasswordValue.current;
            let secondType = inputTypes.CONFIRM_PASSWORD;
            let error = validateRegistration(type!, inputValue);
            let secondError = validateRegistration(secondType!, inputValue, secondInputValue);

            focusHandler(undefined, type);
            setErrors({ ...errors, [type]: error, [secondType]: secondError });
        }
        else {
            let error = validateRegistration(type!, inputValue);
            setErrors({ ...errors, [type!]: error });
        }


    }
    function showPassword() {
        confirmPasswordElement.current!.type = "visiblePassword";
        passwordElement.current!.type = "visiblePassword";
    }
    function hidePassword() {
        passwordElement.current!.type = "password";
        confirmPasswordElement.current!.type = "password";
    }
    function focusHandler(event?: React.FocusEvent<HTMLInputElement>, inputType?: string) {
        let type = ''
        if (event) {
            type = event.target.dataset.inputType!;
        }
        else if (inputType) {
            type = inputType;
        }
        else {
            console.log("Focus handler recieved wrong data");
        }

        if (errors[type] == '') {
            emailElement.current!.style.outline = "3px solid blue";
        }
        else {
            emailElement.current!.style.outline = "3px solid red";

        }
    }
    return (
        <div className="register-page">
            <div className="window">
                <p className="hero-text"> Register to Apple </p>
                <form className="form" onSubmit={submitHandler} >
                    <p className="text-block">
                        <span className="text"> Email </span>
                        <span className="error"> {errors.email}</span>
                    </p>
                    <input
                        onFocus={focusHandler}
                        data-input-type={inputTypes.EMAIL}
                        placeholder="Email"
                        className="input email"
                        type="text"
                        ref={emailElement}
                        onChange={changeHandler} />
                    <p className="text-block">
                        <span className="text"> Username  </span>
                        <span className="error"> {errors.username}</span>
                    </p>
                    <input
                        onFocus={focusHandler}
                        data-input-type={inputTypes.USERNAME}
                        placeholder="Username"
                        className="input username"
                        type="text"
                        ref={usernameElement}
                        onChange={changeHandler} />
                    <p className="text-block">
                        <span className="text"> Password  </span>
                        <span className="error"> {errors.password} </span>
                    </p>
                    <input
                        onFocus={focusHandler}
                        data-input-type={inputTypes.PASSWORD}
                        placeholder="Password"
                        className="input password"
                        type="password"
                        ref={passwordElement}
                        onChange={changeHandler} />
                    <p className="text-block">
                        <span className="text"> Confirm Password  </span>
                        <span className="error"> {errors.confirmPassword} </span>
                    </p>
                    <input
                        onFocus={focusHandler}
                        data-input-type={inputTypes.CONFIRM_PASSWORD}
                        placeholder="Confirm Password"
                        className="input password"
                        type="password"
                        ref={confirmPasswordElement}
                        onChange={changeHandler} />
                    <div className="helpful-panel">
                        <span
                            className="show-password"
                            onMouseDown={showPassword}
                            onMouseUp={hidePassword}
                            onMouseLeave={hidePassword}
                        >
                            Show password
                        </span>
                        <span className="forgot-password">
                            Forgot password?
                        </span>
                    </div>
                    <div className="submit">

                        <input
                            className="submit"
                            type="button"
                            onClick={submitHandler}
                            value="Sign Up" />
                    </div>
                </form >
            </div>
        </div>
    );
}



// import Input from "./Input";

// function Form({ title, span }) {
//     const EmailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//     async function submitHandler() {
//         const data = {
//             email: "helloworld@gmail.com",
//             username: 'Piska',
//             password: '123',
//         };

//         try {
//             const response = await fetch('http://192.168.1.221:8080/api/reg', {
//                 method: "POST",
//                 body: JSON.stringify(data), // Преобразуем объект в JSON
//                 headers: {
//                     "Content-Type": "application/json", // Указываем тип содержимого
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error("Ошибка при отправке запроса");
//             }

//             const result = await response.json(); // Парсим ответ от сервера
//             console.log("Успешно:", result);
//         } catch (error) {
//             console.error("Ошибка:", error);
//         }
//     }

//     return (
//         <form>
//             <h1>{title}</h1>
//             <span>{span}</span>
//             <ul>
//                 <li>
//                     <Input
//                         type={'text'}
//                         placeholder={'Name'}
//                         validators={{ isEmpty: 4, minLength: 4 }}
//                     />
//                 </li>
//                 <li>
//                     <Input
//                         type={'email'}
//                         placeholder={'Email'}
//                         validators={{ isEmpty: 4, maskError: EmailRegexp }}
//                     />
//                 </li>
//                 <li>
//                     <Input
//                         type={'password'}
//                         placeholder={'Password'}
//                         validators={{ isEmpty: 4, minLength: 4 }}
//                     />
//                 </li>
//             </ul>
//             <input type="button" onClick={submitHandler} value="Отправить" />
//         </form>
//     );
// }

// export default Form;* /