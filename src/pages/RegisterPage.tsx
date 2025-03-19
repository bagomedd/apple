import { useState, useEffect, useRef } from 'react';
import { validatePasswordsEquality, validateRegistration } from "../utils/validateRegistration";
import { inputTypesInterface, inputTypes } from "../utils/inputTypes";
import { cssColors } from '../utils/cssVariables';
import { Link } from 'react-router';

export function RegisterPage() {
    const SEND_INFO_API = "http://192.168.1.221:8080/api/reg";

    const [errors, setErrors] = useState<inputTypesInterface>({});
    const [submitError, setSubmitError] = useState<string>('');

    interface inputElementsInterface { [inputType: string]: HTMLInputElement; };
    const inputElements = useRef<inputElementsInterface>({});

    interface inputValuesInterface { [inputType: string]: string; };
    const pushInputElements = (inputType: string, element: HTMLInputElement) => { inputElements.current[inputType] = element };
    const inputValues = useRef<inputValuesInterface>({});

    const submitButton = useRef<HTMLButtonElement | null>(null);
    const showPasswordButton = useRef<HTMLButtonElement | null>(null);
    const contentWindow = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        submitButton.current!.onclick = submitHandler;
    }, [])
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
        let json_info = jsonConverter(
            inputValues.current[inputTypes.EMAIL],
            inputValues.current[inputTypes.USERNAME],
            inputValues.current[inputTypes.PASSWORD]
        );

        try {
            let response = await fetch(SEND_INFO_API, {
                // mode: 'no-cors',
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: json_info,
                signal: AbortSignal.timeout(3000)
            });
        }
        catch {
            setSubmitError('There is some troubles, please, try later');
        }
    }
    async function submitHandler() {
        setSubmitError('');

        let error = '';
        let isRejected = false;
        let errorsArray: inputTypesInterface = {};

        let inputTypesKey: keyof inputTypesInterface;
        for (inputTypesKey in inputTypes) {
            inputValues.current[inputTypesKey] = inputElements.current[inputTypesKey].value;
            error = validateRegistration(inputTypesKey, inputElements.current[inputTypesKey].value);
            errorsArray[inputTypesKey] = error;
            if (error != '') {
                isRejected = true;
            }
        }
        error = validatePasswordsEquality(
            inputElements.current[inputTypes.PASSWORD].value,
            inputElements.current[inputTypes.CONFIRM_PASSWORD].value
        );
        if (error != '') {
            errorsArray[inputTypes.CONFIRM_PASSWORD] = error;
            isRejected = true;
        }

        setErrors(errorsArray);
        if (!isRejected) {
            deactivateSubmitButton();
            await sendInfo();
            activateSubmitButton();
        }
    }
    function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        let type = event.target.dataset.inputType!;
        let inputValue = event.target.value;
        let errorsArray: inputTypesInterface = errors;

        errorsArray[type!] = validateRegistration(type!, inputValue);
        // console.log(errorsArray[type]);

        if (type == inputTypes.CONFIRM_PASSWORD) {
            errorsArray[inputTypes.CONFIRM_PASSWORD] = validatePasswordsEquality(
                inputElements.current[inputTypes.PASSWORD].value,
                inputElements.current[inputTypes.CONFIRM_PASSWORD].value
            )
        }
        focusHandler(undefined, type!);
        setErrors({
            [inputTypes.EMAIL]: errorsArray[inputTypes.EMAIL],
            [inputTypes.USERNAME]: errorsArray[inputTypes.USERNAME],
            [inputTypes.PASSWORD]: errorsArray[inputTypes.PASSWORD],
            [inputTypes.CONFIRM_PASSWORD]: errorsArray[inputTypes.CONFIRM_PASSWORD]
        });
    }
    function showPassword() {
        inputElements.current[inputTypes.PASSWORD].type = "visiblePassword";
        inputElements.current[inputTypes.CONFIRM_PASSWORD].type = "visiblePassword";
        showPasswordButton.current!.style.backgroundColor = "" + cssColors['--blue-c2'];
    }
    function hidePassword() {
        inputElements.current[inputTypes.PASSWORD].type = "password";
        inputElements.current[inputTypes.CONFIRM_PASSWORD].type = "password";
        showPasswordButton.current!.style.backgroundColor = "" + cssColors['--blue-c1'];

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
            inputElements.current[type].style.outline = "3px solid" + cssColors['--blue-c1'];
        }
        else {
            inputElements.current[type].style.outline = "3px solid" + cssColors['--red-c1'];
        }
    }
    function blurHandler(event?: React.FocusEvent<HTMLInputElement>, inputType?: string) {
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
            // COLOR
            inputElements.current[type].style.outline = "0px solid" + cssColors['--blue-c1'];
        }
        else {
            // COLOR
            inputElements.current[type].style.outline = "0px solid" + cssColors['--red-c1'];
        }
    }
    function deactivateSubmitButton() {
        submitButton.current!.style.backgroundColor = cssColors['--gray-c1'];
        submitButton.current!.onclick = null;
    }
    function activateSubmitButton() {
        submitButton.current!.style.backgroundColor = cssColors['--blue-c1'];
        submitButton.current!.onclick = submitHandler;
    }
    function openLoginWindow() {
        contentWindow.current!.style.marginTop = "-640px";
    }
    function openSignUpWindow() {
        contentWindow.current!.style.marginTop = "0px";
    }

    return (
        <div className="register-page">
            <Link to="/" className="back"> Back </Link>
            <div className="window">
                <div className="content-window" ref={contentWindow}>
                    <div className="register-window">
                        <p className="hero-text"> Register to Apple </p>
                        <form className="form" onSubmit={submitHandler} >
                            <p className="text-block">
                                <span className="text"> Email </span>
                                <span className="error"> {errors[inputTypes.EMAIL]}</span>
                            </p>
                            <input
                                data-input-type={inputTypes.EMAIL}
                                placeholder="Email"
                                className="input email"
                                type="text"
                                ref={(element) => { pushInputElements(inputTypes.EMAIL, element!) }}
                                onChange={changeHandler}
                                onFocus={focusHandler}
                                onBlur={blurHandler}
                            />
                            <p className="text-block">
                                <span className="text"> Username  </span>
                                <span className="error"> {errors[inputTypes.USERNAME]}</span>
                            </p>
                            <input
                                data-input-type={inputTypes.USERNAME}
                                placeholder="Username"
                                className="input username"
                                type="text"
                                ref={(element) => { pushInputElements(inputTypes.USERNAME, element!) }}
                                onChange={changeHandler}
                                onFocus={focusHandler}
                                onBlur={blurHandler}
                            />
                            <p className="text-block">
                                <span className="text"> Password  </span>
                                <span className="error"> {errors[inputTypes.PASSWORD]} </span>
                            </p>
                            <input
                                data-input-type={inputTypes.PASSWORD}
                                placeholder="Password"
                                className="input password"
                                type="password"
                                ref={(element) => { pushInputElements(inputTypes.PASSWORD, element!) }}
                                onChange={changeHandler}
                                onFocus={focusHandler}
                                onBlur={blurHandler}
                            />
                            <p className="text-block">
                                <span className="text"> Confirm Password  </span>
                                <span className="error"> {errors[inputTypes.CONFIRM_PASSWORD]} </span>
                            </p>
                            <input
                                data-input-type={inputTypes.CONFIRM_PASSWORD}
                                placeholder="Confirm Password"
                                className="input password"
                                type="password"
                                ref={(element) => { pushInputElements(inputTypes.CONFIRM_PASSWORD, element!) }}
                                onChange={changeHandler}
                                onFocus={focusHandler}
                                onBlur={blurHandler}
                            />
                            <div className="helpful-panel">
                                <button
                                    className="btn show-password"
                                    type="button"
                                    onMouseDown={showPassword}
                                    onMouseUp={hidePassword}
                                    onMouseLeave={hidePassword}
                                    ref={showPasswordButton}
                                >
                                    Show password
                                </button>
                                {/* <span className="forgot-password">
                                    Forgot password?
                                </span> */}
                            </div>
                            <div className="submit">

                                <button
                                    className="btn submit-btn"
                                    type="button"
                                    onClick={submitHandler}

                                    ref={submitButton}
                                >
                                    Sign Up
                                </button>
                                <div className="error-space">
                                    <span className="error"> {submitError} </span>
                                </div>
                            </div>
                        </form >
                        <div className="or">
                            <div className="line"></div>
                            <span className="text">or</span>
                            <div className="line"></div>

                        </div>
                        <div className="button-panel">
                            <button className="btn google-button"> Google </button>
                            <button
                                className="btn  login-button"
                                onClick={openLoginWindow}
                            > Login </button>
                        </div>
                    </div>
                    <div className="login-window">

                        <p className="hero-text"> Login to Apple </p>
                        {/* <form className="form" onSubmit={submitHandler} > */}
                        <form className="form" >
                            <p className="text-block">
                                <span className="text"> Email </span>
                                {/* <span className="error"> {errors[inputTypes.EMAIL]}</span> */}
                            </p>
                            <input
                                // data-input-type={inputTypes.EMAIL}
                                placeholder="Email"
                                className="input email"
                                type="text"
                            // ref={(element) => { pushInputElements(inputTypes.EMAIL, element!) }}
                            // onChange={changeHandler}
                            // onFocus={focusHandler}
                            // onBlur={blurHandler}
                            />
                            <p className="text-block">
                                <span className="text"> Username  </span>
                                {/* <span className="error"> {errors[inputTypes.USERNAME]}</span> */}
                            </p>
                            <input
                                // data-input-type={inputTypes.USERNAME}
                                placeholder="Username"
                                className="input username"
                                type="text"
                            // ref={(element) => { pushInputElements(inputTypes.USERNAME, element!) }}
                            // onChange={changeHandler}
                            // onFocus={focusHandler}
                            // onBlur={blurHandler}
                            />
                            <p className="text-block">
                                <span className="text"> Password  </span>
                                {/* <span className="error"> {errors[inputTypes.PASSWORD]} </span> */}
                            </p>
                            <input
                                // data-input-type={inputTypes.PASSWORD}
                                placeholder="Password"
                                className="input password"
                                type="password"
                            // ref={(element) => { pushInputElements(inputTypes.PASSWORD, element!) }}
                            // onChange={changeHandler}
                            // onFocus={focusHandler}
                            // onBlur={blurHandler}
                            />

                            <div className="helpful-panel">
                                <button
                                    className="btn show-password"
                                    type="button"
                                // onMouseDown={showPassword}
                                // onMouseUp={hidePassword}
                                // onMouseLeave={hidePassword}
                                // ref={showPasswordButton}
                                >
                                    Show password
                                </button>
                                <span className="forgot-password">
                                    Forgot password?
                                </span>
                            </div>
                            <div className="submit">

                                <button
                                    className="btn submit-btn"
                                    type="button"
                                // onClick={submitHandler}

                                // ref={submitButton}
                                >
                                    Log in
                                </button>
                                <div className="error-space">
                                    {/* <span className="error"> {submitError} </span> */}
                                </div>
                            </div>
                        </form >
                        <div className="or">
                            <div className="line"></div>
                            <span className="text">or</span>
                            <div className="line"></div>

                        </div>
                        <div className="button-panel">
                            <button className="btn google-button"> Google </button>
                            <button
                                className="btn  login-button"
                                onClick={openSignUpWindow}
                            > Sign Up </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}