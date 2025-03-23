import { Link } from "react-router";
import { RegisterWindow } from "../common/RegisterWindow";

export function AuthLayout() {
    return (
        <div className="register-page">
            <Link to="/" className="back"> Back </Link>
            <div className="window">
                <div className="content-window">
                    <RegisterWindow />
                </div>
            </div>
        </div>
    )
}