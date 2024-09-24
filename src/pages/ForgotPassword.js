import { useState } from "react";
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import { useSearchParams } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

function ForgotPassword() {
    const [issueText, setIssueText] = useState("");

    const [searchParams] = useSearchParams();

    const actionCode  = searchParams.get("oobCode");

    const firebaseConfig = {
        apiKey: "AIzaSyBhZennDV3ZADrDvo80mzUe-COsYt54qb0",
        authDomain: "responsetimetrack.firebaseapp.com",
        databaseURL: "https://responsetimetrack-default-rtdb.firebaseio.com",
        projectId: "responsetimetrack",
        storageBucket: "responsetimetrack.appspot.com",
        messagingSenderId: "791918313690",
        appId: "1:791918313690:web:2cf8e8c3d4c0ea4d4d25e3",
        measurementId: "G-7H129EB6LY"
    }
    
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        

        const formJson = Object.fromEntries(formData.entries());

        verifyPasswordResetCode(auth, actionCode).then((email) => {
            const newPassword = formJson.password;

            confirmPasswordReset(auth, actionCode, newPassword).then((res) => {
                setIssueText("Password Updated!");
            }).catch((error) => {
                setIssueText("Error with Password Update");
            });

        }).catch((error) => {
            setIssueText("Error with Authenication");
        });
    }

    return (
        <div id="password-reset-main">
            <h1 id="password-reset-header">Password Reset</h1>
            <form onSubmit={handleSubmit}>

                <input 
                    id="password-reset-textfield"
                    name="password"
                    type="text"></input>
                <p id="issue-text">{ issueText }</p>

                <button id="password-button">Reset Password</button>

            </form>
        </div>
    );
}

export default ForgotPassword;