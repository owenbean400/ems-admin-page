import { applyActionCode } from "firebase/auth";
import { useState } from "react";

function EmailVerification(props) {
    const [issueText, setIssueText] = useState("");
    const [IsEmailVerified, setIsEmailVerified] = useState(false);


    function handleSubmit(e) {
        e.preventDefault();

        applyActionCode(props.auth, props.actionCode).then((response) => {
            setIsEmailVerified(true);
        }).catch((e) => {
            setIssueText("Error with email verification");
        });
    }

    return(<div>
        {(IsEmailVerified ? 
            <div  className="auth-main">
                <h1 className="auth-header">Email Verified!</h1>
            </div> :
            <div className="auth-main">
                <h1 className="auth-header">Email Verification</h1>
                <form onSubmit={handleSubmit} className="auth-form">
                    <p className="auth-issue-text">{ issueText }</p>
                    <button className="auth-button">Verify Email</button>
                </form>
            </div>)}
    </div>)

}

export default EmailVerification;