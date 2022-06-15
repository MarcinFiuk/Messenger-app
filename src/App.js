import styled from 'styled-components';
import { useState } from 'react';

import Friends from './components/Friends';
import ChatWindow from './components/ChatWindow';
import useFetch from './hooks/useFetch';

function App() {
    const [activeUser, setActiveUser] = useState('Marcin');
    const [conversationPartner, setConversationPartner] = useState('');
    const chatUsers = useFetch('users');

    // const queryValue = getQuerySearch(activeUser, conversationPartner);
    // console.log(queryValue);
    // const conversationCode = useFetch('chatId', 'users', '==', queryValue);

    // console.log(conversationCode);

    const getConversationPartner = (name) => {
        setConversationPartner(name);
    };

    // useEffect(() => {
    //     if (conversation && conversation.messages?.length > 0) {
    //         const discussion = conversation.messages.map((el, i) => {
    //             const { who, what } = el;
    //             return (
    //                 <div key={i}>
    //                     <div>{who}</div>
    //                     <p>{what}</p>
    //                 </div>
    //             );
    //         });
    //         setDiscussion(discussion);
    //     }
    // }, [conversation]);

    return (
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
    );
}

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 5fr;
    background-color: #434343;
    margin: 0;
`;

export default App;
