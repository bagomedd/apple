export function RegisterWindow() {
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
}