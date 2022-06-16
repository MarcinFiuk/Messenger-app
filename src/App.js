import styled from 'styled-components';
import { useState } from 'react';

import Friends from './components/Friends';
import ChatWindow from './components/ChatWindow';
import useFetch from './hooks/useFetch';
import Header from './components/Header';
import Login from './components/Login';

function App() {
    const [activeUser, setActiveUser] = useState('');
    const [conversationPartner, setConversationPartner] = useState('');
    const chatUsers = useFetch('users');

    const getConversationPartner = (name) => {
        setConversationPartner(name);
    };

    const getActiveUser = (name) => {
        setActiveUser(name);
    };

    return (
        <>
            <Header getActiveUser={getActiveUser} activeUser={activeUser} />
            <main>
                {!activeUser && (
                    <LoginWrapper>
                        <Login getActiveUser={getActiveUser} />
                    </LoginWrapper>
                )}
                {activeUser && (
                    <Wrapper>
                        <Friends
                            users={chatUsers}
                            getConversationPartner={getConversationPartner}
                            activeUser={activeUser}
                        />
                        <ChatWindow
                            conversationPartner={conversationPartner}
                            activeUser={activeUser}
                        />
                    </Wrapper>
                )}
            </main>
        </>
    );
}

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 5fr;
    background-color: #434343;
    margin: 0;
`;

const LoginWrapper = styled.div`
    display: grid;
    place-items: center;
    min-height: calc(100vh - 6rem);
`;

export default App;
