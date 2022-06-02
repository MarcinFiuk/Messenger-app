import styled from 'styled-components';
import { useState, useEffect } from 'react';

import { friends } from './friends';

import { conversationsHistory } from './conversationsHistory';

function App() {
    const [conversation, setConversation] = useState(null);
    const [discussion, setDiscussion] = useState('');

    const activeUserHandler = (id) => {
        setConversation(conversationsHistory[id - 1]);
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

        setConversation(newConversationHistory);

        // setConversation((prevChat) => {
        //     console.log(conversationsHistory[0]);
        //     return {
        //         ...prevChat,
        //         messages: [
        //             ...prevChat.messages,
        //             {
        //                 who: 'Marcin',
        //                 what: messageToAdd,
        //             },
        //         ],
        //     };
        // });
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

    const friendsToDisplay = friends.map((friend) => {
        return (
            <button
                key={friend.id}
                onClick={() => activeUserHandler(friend.id)}
            >
                <img src={friend.photo} alt='user' />
                <p>{friend.name}</p>
            </button>
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
`;

const FriendsContainer = styled.div`
    button {
        width: 100%;
        display: grid;
        grid-template-columns: 2fr 1fr;
        justify-content: center;
        align-items: center;
    }
`;

const CommunicationWindow = styled.div``;

const MessageWindow = styled.div`
    width: 100%;
    min-height: 90%;
    background-color: #c2c2c2;
`;

const MessageInput = styled.input``;

export default App;
