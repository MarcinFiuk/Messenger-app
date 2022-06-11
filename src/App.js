import styled from 'styled-components';
import { useState, useEffect } from 'react';

import Friend from './components/Friend';
import { conversationsHistory } from './conversationsHistory';
import useFetch from './hooks/useFetch';

function App() {
    const [allMessages, setAllMessages] = useState(conversationsHistory);
    const [activeUser, setActiveUser] = useState(0);
    const [discussion, setDiscussion] = useState('');
    const chatUsers = useFetch('users');

    const conversation = allMessages[activeUser];

    const activeUserHandler = (index) => {
        setActiveUser(index);
    };

    const newMessageHandle = (e) => {
        e.preventDefault();
        if (!conversation) return;
        const messageToAdd = e.currentTarget.elements.message.value;

        const newConversationHistory = {
            ...conversation,
            messages: [
                ...conversation.messages,
                {
                    who: 'Marcin',
                    what: messageToAdd,
                },
            ],
        };

        const newConversation = [...allMessages];
        newConversation[activeUser] = newConversationHistory;

        setAllMessages(newConversation);
    };

    useEffect(() => {
        if (conversation && conversation.messages?.length > 0) {
            const discussion = conversation.messages.map((el, i) => {
                const { who, what } = el;
                return (
                    <div key={i}>
                        <div>{who}</div>
                        <p>{what}</p>
                    </div>
                );
            });
            setDiscussion(discussion);
        }
    }, [conversation]);

    const friendsToDisplay = chatUsers.map((user, index) => {
        const { id } = user;
        return (
            <Friend
                friend={user}
                index={index}
                key={id}
                onClick={() => activeUserHandler(index)}
            />
        );
    });

    return (
        <Wrapper>
            <FriendsContainer>{friendsToDisplay}</FriendsContainer>
            <CommunicationWindow>
                <MessageWindow>{discussion}</MessageWindow>
                <form onSubmit={newMessageHandle}>
                    <MessageInput type='text' name='message'></MessageInput>
                </form>
            </CommunicationWindow>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 5fr;
    background-color: #434343;
`;

const FriendsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const CommunicationWindow = styled.div``;

const MessageWindow = styled.div`
    width: 100%;
    min-height: 90%;
    background-color: #c2c2c2;
`;

const MessageInput = styled.input``;

export default App;
