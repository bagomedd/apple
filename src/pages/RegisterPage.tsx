import { Link } from "react-router";
import { RegisterWindow } from "../Components/common/RegisterWindow";
import { useRef } from "react";
import { LoginWindow } from "../Components/common/LoginWindow";
import { openLoginWindow, openRegisterWindow } from "../utils/commonAuthFunctions";
export function RegisterPage() {
    const contentWindow = useRef<HTMLDivElement | null>(null)
    return (
        <div className="register-page">
            <Link to="/" className="back"> Back </Link>
            <div className="window">
                <div className="content-window" ref={contentWindow}>
                    <RegisterWindow >
                        <button
                            className="btn  login-button"
                            onClick={() => { openLoginWindow(contentWindow.current!) }}
                        > Login </button>
                    </RegisterWindow>
                    <LoginWindow>
                        <button
                            className="btn  login-button"
                            onClick={() => { openRegisterWindow(contentWindow.current!) }}
                        > Sign Up </button>
                    </LoginWindow>
                </div>
            </div>
        </div>
    )
}