import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { doc, onSnapshot } from 'firebase/firestore';

import MessageInput from './MessageInput';
import useFetch from './../hooks/useFetch';
import { getQuerySearch } from './../helpers/fetchingHelpers';
import { db } from './../firebase';

function ChatWindow({ conversationPartner, activeUser }) {
    const [discussion, setDiscussion] = useState([]);
    const queryValue = getQuerySearch(activeUser, conversationPartner);
    const conversationCode = useFetch('chatId', 'users', '==', queryValue);
    const [code = {}] = conversationCode;
    const { identifier = null } = code;

    //NOTE: display conversation when it fetch
    //NOTE: try to set some observer

    useEffect(() => {
        let unsubscribe;

        if (identifier) {
            unsubscribe = onSnapshot(
                doc(db, `conversationHistory/${identifier}`),
                (doc) => {
                    const { chat } = doc.data();
                    setDiscussion(chat);
                }
            );
        }

        return () => {
            if (identifier) {
                unsubscribe();
            }
        };
    }, [identifier]);

    const discussionToDisplay = discussion.map((oneMessage) => {
        const { id, who, what } = oneMessage;
        return (
            <MessageWrapper key={id}>
                <p>
                    <strong>{who}</strong>
                </p>
                <p>{what}</p>
            </MessageWrapper>
        );
    });

    return (
        <CommunicationWindow>
            <MessageWindow>{discussionToDisplay}</MessageWindow>
            <MessageInput
                activeUser={activeUser}
                conversationPartner={conversationPartner}
                conversationId={identifier}
            />
        </CommunicationWindow>
    );
}

const CommunicationWindow = styled.div`
    min-height: 100%;
    display: flex;
    flex-direction: column;
`;

const MessageWrapper = styled.div`
    display: flex;
    gap: 20px;
`;

const MessageWindow = styled.div`
    width: 100%;
    min-height: calc(100vh - 50px);
    background-color: #c2c2c2;
`;

export default ChatWindow;
