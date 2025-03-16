import { ChangeEvent, useState, useRef } from 'react';
import { validateRegistration } from "../Components/utils/validateRegistration";
import { inputTypes } from "../Components/utils/inputTypes";



export function RegisterPage() {



    const SEND_INFO_API = "http://192.168.1.221:8080/api/reg";

    const emailValue = useRef<string>('');
    const emailElement = useRef<HTMLInputElement | null>(null);
    const loginValue = useRef<string>('');
    const loginElement = useRef<HTMLInputElement | null>(null);
    const passwordValue = useRef<string>('');
    const passwordElement = useRef<HTMLInputElement | null>(null);
    const confirmPasswordValue = useRef<string>('');
    const confirmPasswordElement = useRef<HTMLInputElement | null>(null);
    const [errors, setErrors] = useState({ email: "", username: "", password: "", confirmPassword: "" });



    function jsonConverter(emailValue: string, loginValue: string, passwordValue: string) {
        return (
            JSON.stringify({
                "email": emailValue,
                "username": loginValue,
                "password": passwordValue
            })
        );
    }
    async function sendInfo() {
        const json_info = jsonConverter(emailValue.current, loginValue.current, passwordValue.current);

        fetch(SEND_INFO_API, {
            // mode: 'no-cors',
            "method": "POST",
            "headers": { "Content-type": "application/json" },
            "body": json_info
        });
    }
    function submitHandler() {
        emailValue.current = emailElement.current!.value;
        loginValue.current = loginElement.current!.value;
        passwordValue.current = passwordElement.current!.value;
        confirmPasswordValue.current = confirmPasswordElement.current!.value;
        sendInfo();
    }
    function changeHandler(event: ChangeEvent<HTMLInputElement>) {

        let type = event.target.dataset.inputType;
        let inputValue = event.target.value;
        let secondInputValue = ''
        let secondType = '';

        if (type == inputTypes.PASSWORD || type == inputTypes.CONFIRM_PASSWORD) {

            passwordValue.current = passwordElement.current!.value;
            confirmPasswordValue.current = confirmPasswordElement.current!.value;

            inputValue = passwordValue.current;
            secondInputValue = confirmPasswordValue.current;
            secondType = inputTypes.CONFIRM_PASSWORD;

            let error = validateRegistration(type!, inputValue);
            let secondError = validateRegistration(secondType!, inputValue, secondInputValue);

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
                        data-input-type={inputTypes.USERNAME}
                        placeholder="Username"
                        className="input login"
                        type="text"
                        ref={loginElement}
                        onChange={changeHandler} />
                    <p className="text-block">
                        <span className="text"> Password  </span>
                        <span className="error"> {errors.password} </span>
                    </p>
                    <input
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
                        data-input-type={inputTypes.CONFIRM_PASSWORD}
                        placeholder="Confirm Password"
                        className="input password"
                        type="password"
                        ref={confirmPasswordElement}
                        onChange={changeHandler} />
                    <div
                        onMouseDown={showPassword}
                        onMouseUp={hidePassword}
                        onMouseLeave={hidePassword}
                        className="show-password"
                    > Show password</div>
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