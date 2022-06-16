import styled from 'styled-components';
import { signOut } from 'firebase/auth';

import { auth } from './../firebase';

function Header({ getActiveUser, activeUser }) {
    const buttonText = activeUser ? 'Sign out' : 'Sign in';
    const signOutHandler = () => {
        try {
            signOut(auth);
            getActiveUser(null);
        } catch (err) {
            const errorCode = err.code;
            const errorMessage = err.message;
        }
    };

    return (
        <Wrapper>
            <h1>Logo</h1>
            <button onClick={signOutHandler}>{buttonText}</button>
        </Wrapper>
    );
}

const Wrapper = styled.header`
    display: flex;
    justify-content: space-between;
    align-content: center;

    button {
        min-width: 100px;
        font-size: 1.5rem;
    }
`;

export default Header;
