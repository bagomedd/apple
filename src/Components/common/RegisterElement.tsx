import { useState, useEffect, useRef } from 'react';
import { validatePasswordsEquality, validateRegistration } from "../../utils/validateRegistration";
import { inputTypesInterface, inputTypes, emptyInputTypes, toInputKey } from "../../utils/inputTypes";
import { Link } from 'react-router';
import * as auth from "../../utils/commonAuthFunctions";
import { errorMonitor } from 'events';
import { REG_API } from "../../utils/api";

export function RegisterPage() {


    const [errors, setErrors] = useState<inputTypesInterface>(emptyInputTypes);
    const [submitError, setSubmitError] = useState<string>('');

    // interface inputElementsInterface { [inputType: string]: HTMLInputElement; };
    const inputElements = useRef<auth.inputElementsInterface>({});

    // interface inputValuesInterface {
    //     [inputType: string]: string;
    // };
    const pushInputElements = (inputType: string, element: HTMLInputElement) => { inputElements.current[inputType] = element };
    const inputValues = useRef<auth.inputValuesInterface>({});

    const submitButton = useRef<HTMLButtonElement | null>(null);
    const showPasswordButton = useRef<HTMLButtonElement | null>(null);
    const contentWindow = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        submitButton.current!.onclick = submitHandler;
    }, [])

    async function submitHandler() {
        setSubmitError('');

        let error = '';
        let isRejected = false;
        let errorsArray: inputTypesInterface = emptyInputTypes;

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
            auth.deactivateSubmitButton(submitButton.current!);
            await auth.sendInfo(
                REG_API,
                inputValues.current![inputTypes.EMAIL],
                inputValues.current![inputTypes.USERNAME],
                inputValues.current![inputTypes.PASSWORD]
            );
            auth.activateSubmitButton(submitButton.current!, submitHandler);
        }
    }
    function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        let type = event.target.dataset.inputType!;
        let inputValue = event.target.value;
        let errorsArray: inputTypesInterface = errors;

        errorsArray[toInputKey(type!)!] = validateRegistration(type!, inputValue);
        // console.log(errorsArray[type]);

        if (type == inputTypes.CONFIRM_PASSWORD || type == inputTypes.PASSWORD) {
            errorsArray[inputTypes.CONFIRM_PASSWORD] = validatePasswordsEquality(
                inputElements.current[inputTypes.PASSWORD].value,
                inputElements.current[inputTypes.CONFIRM_PASSWORD].value
            )
        }
        auth.inputFocusHandler(type!, errors, inputElements.current);
        setErrors({
            [inputTypes.EMAIL]: errorsArray[inputTypes.EMAIL],
            [inputTypes.USERNAME]: errorsArray[inputTypes.USERNAME],
            [inputTypes.PASSWORD]: errorsArray[inputTypes.PASSWORD],
            [inputTypes.CONFIRM_PASSWORD]: errorsArray[inputTypes.CONFIRM_PASSWORD]
        });
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
                                onFocus={(event) => { auth.inputFocusHandler(inputTypes.EMAIL, errors, inputElements.current) }}
                                onBlur={(event) => { auth.inputBlurHandler(inputTypes.EMAIL, errors, inputElements.current) }}
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
                                onFocus={(event) => { auth.inputFocusHandler(inputTypes.USERNAME, errors, inputElements.current) }}
                                onBlur={(event) => { auth.inputBlurHandler(inputTypes.USERNAME, errors, inputElements.current) }}

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
                                onFocus={(event) => { auth.inputFocusHandler(inputTypes.PASSWORD, errors, inputElements.current) }}
                                onBlur={(event) => { auth.inputBlurHandler(inputTypes.PASSWORD, errors, inputElements.current) }}

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
                                onFocus={(event) => { auth.inputFocusHandler(inputTypes.CONFIRM_PASSWORD, errors, inputElements.current) }}
                                onBlur={(event) => { auth.inputBlurHandler(inputTypes.CONFIRM_PASSWORD, errors, inputElements.current) }}

                            />
                            <div className="helpful-panel">
                                <button
                                    className="btn show-password"
                                    type="button"
                                    onMouseDown={() => {
                                        auth.showPassword(
                                            inputElements.current[inputTypes.PASSWORD],
                                            inputElements.current[inputTypes.CONFIRM_PASSWORD],
                                            showPasswordButton.current!
                                        )
                                    }}
                                    onMouseUp={() => {
                                        auth.hidePassword(
                                            inputElements.current[inputTypes.PASSWORD],
                                            inputElements.current[inputTypes.CONFIRM_PASSWORD],
                                            showPasswordButton.current!
                                        )
                                    }}
                                    onMouseLeave={() => {
                                        auth.hidePassword(
                                            inputElements.current[inputTypes.PASSWORD],
                                            inputElements.current[inputTypes.CONFIRM_PASSWORD],
                                            showPasswordButton.current!
                                        )
                                    }}
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
                                onClick={() => { auth.openLoginWindow(contentWindow.current!) }}
                            > Login </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}