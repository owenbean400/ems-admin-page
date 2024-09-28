import { useState } from "react";
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";

function ForgotPassword(props) {
    const [issueText, setIssueText] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());

        verifyPasswordResetCode(props.auth, props.actionCode).then((email) => {
            const newPassword = formJson.password;

            confirmPasswordReset(props.auth, props.actionCode, newPassword).then((res) => {
                setIssueText("Password Updated!");
            }).catch((error) => {
                setIssueText("Error with Password Update");
            });

        }).catch((error) => {
            setIssueText("Error with Authenication");
        });
    }

    return (
        <div className="auth-main">
            <h1 className="auth-header">Password Reset</h1>
            <form onSubmit={handleSubmit} className="auth-form">

                <div className="password-reset-text-container">
                    <input 
                        id="password-reset-textfield"
                        name="password"
                        type={(isShowPassword) ? "text" : "password"}></input>
                    <span className="material-symbols-outlined password-toggle-text-form" onClick={() => setIsShowPassword(!isShowPassword)}>{isShowPassword ? "visibility_off" : "visibility"} </span>
                </div>
                <p className="auth-issue-text">{ issueText }</p>

                <button className="auth-button">Reset Password</button>

            </form>
        </div>
    );
}

export default ForgotPassword;