import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getUserNameFromEmail } from './../helpers/authHelpers';

import { auth } from './../firebase';

function Login({ getActiveUser }) {
    const buttonText = 'Login';

    const login = async (auth, email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
            const userName = getUserNameFromEmail(user.email);
            //NOTE:reset the form
            getActiveUser(userName);
        } catch (err) {
            const errorCode = err.code;
            const errorMessage = err.message;
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        if (!password || !email) {
            return;
        }

        login(auth, email, password);
    };

    return (
        <form onSubmit={submitHandler}>
            <div>
                <label>Login (email)</label>
                <input type='email' name='email' />
            </div>
            <div>
                <label>Password</label>
                <input type='password' minLength='6' name='password' />
            </div>
            <button type='submit'>{buttonText}</button>
        </form>
    );
}

export default Login;
