import { useState, useEffect, useRef } from 'react';
import { validatePasswordsEquality, validateRegistration } from "../../utils/validateRegistration";
import { inputTypesInterface, inputTypes, emptyInputTypes, toInputKey } from "../../utils/inputTypes";
import * as auth from "../../utils/commonAuthFunctions";
import { LOG_API } from "../../utils/api";


export function LoginWindow({ children }: React.PropsWithChildren) {
    const [errors, setErrors] = useState<inputTypesInterface>(emptyInputTypes);
    const [submitError, setSubmitError] = useState<string>('');

    const inputElements = useRef<auth.inputElementsInterface>({});
    const pushInputElements = (inputType: string, element: HTMLInputElement) => { inputElements.current[inputType] = element };
    const inputValues = useRef<auth.inputValuesInterface>({});
    const submitButton = useRef<HTMLButtonElement | null>(null);
    const showPasswordButton = useRef<HTMLButtonElement | null>(null);
    const loginWindow = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        submitButton.current!.onclick = submitHandler;
    }, [])

    async function submitHandler() {
        setSubmitError('');
        // console.log("123");

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

        if (error != '') {
            errorsArray[inputTypes.CONFIRM_PASSWORD] = error;
            isRejected = true;
        }

        setErrors(errorsArray);
        if (!isRejected) {
            auth.deactivateSubmitButton(submitButton.current!);
            let localSubmitError = await auth.sendInfo(
                LOG_API,
                inputValues.current![inputTypes.EMAIL],
                inputValues.current![inputTypes.USERNAME],
                inputValues.current![inputTypes.PASSWORD]
            );
            if (localSubmitError) {
                setSubmitError(localSubmitError);
            }
            auth.activateSubmitButton(submitButton.current!, submitHandler);
        }
    }
    function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        let type = event.target.dataset.inputType!;
        let inputValue = event.target.value;
        let errorsArray: inputTypesInterface = errors;

        errorsArray[toInputKey(type!)!] = validateRegistration(type!, inputValue);
        // console.log(errorsArray[type]);

        auth.inputFocusHandler(type!, errors, inputElements.current);
        setErrors({
            [inputTypes.EMAIL]: errorsArray[inputTypes.EMAIL],
            [inputTypes.USERNAME]: errorsArray[inputTypes.USERNAME],
            [inputTypes.PASSWORD]: errorsArray[inputTypes.PASSWORD],
            [inputTypes.CONFIRM_PASSWORD]: ""
        });
    }



    return (
        <div className="register-window" ref={loginWindow}>
            <p className="hero-text"> Login to Apple </p>
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

                <div className="helpful-panel">
                    <button
                        className="btn show-password"
                        type="button"
                        onMouseDown={() => {
                            auth.showPassword(
                                inputElements.current[inputTypes.PASSWORD],
                                null,
                                showPasswordButton.current!
                            )
                        }}
                        onMouseUp={() => {
                            auth.hidePassword(
                                inputElements.current[inputTypes.PASSWORD],
                                null,
                                showPasswordButton.current!
                            )
                        }}
                        onMouseLeave={() => {
                            auth.hidePassword(
                                inputElements.current[inputTypes.PASSWORD],
                                null,
                                showPasswordButton.current!
                            )
                        }}
                        ref={showPasswordButton}
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
                        ref={submitButton}
                    >
                        Log in
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
                {children}
            </div>
        </div>
    );
}