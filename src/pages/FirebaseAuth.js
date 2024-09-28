import { useSearchParams } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import ForgotPassword from "../components/firebaseAuth/ForgotPassword";
import NoMode from '../components/firebaseAuth/NoMode';
import EmailVerification from '../components/firebaseAuth/EmailVerification';

function FirebaseAuthPage() {
    const [searchParams] = useSearchParams();

    const actionCode  = searchParams.get("oobCode");
    const mode = searchParams.get("mode");

    function setAuthActionPage(actionMode) {
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

        switch (actionMode) {
            case "resetPassword":
                return (<ForgotPassword auth={auth} actionCode={actionCode}/>)
            case "verifyEmail":
                return (<EmailVerification  auth={auth} actionCode={actionCode}/>);
            default:
                return (<NoMode />);
        }
    }

    return (
        <div>
            {setAuthActionPage(mode)}
        </div>
    );
}

export default FirebaseAuthPage;