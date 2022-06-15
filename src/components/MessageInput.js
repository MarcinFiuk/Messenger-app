import {
    doc,
    collection,
    setDoc,
    addDoc,
    updateDoc,
    arrayUnion,
} from 'firebase/firestore';
import styled from 'styled-components';

import { db } from './../firebase';

function MessageInput({ conversationPartner, conversationId, activeUser }) {
    console.log(conversationPartner, conversationId, activeUser);
    //

    const addMessageToFirebase = async (message) => {
        const ref = doc(db, 'conversationHistory', conversationId);
        await updateDoc(ref, {
            chat: arrayUnion(message),
        });
    };

    const newMessageHandle = (e) => {
        e.preventDefault();

        const message = {
            id: Date.now(),
            who: activeUser,
            what: e.target.message.value,
        };

        addMessageToFirebase(message);

        e.target.reset();
    };

    const form = conversationPartner && (
        <Form onSubmit={newMessageHandle}>
            <input type='text' name='message' placeholder='message' />
            <button type='submit'>SEND</button>
        </Form>
    );
    return form;
}

const Form = styled.form`
    display: flex;
    justify-self: flex-end;

    input {
        width: 100%;
        font-size: 1.8rem;
    }

    button {
        font-size: 1.8rem;
        padding: 10px 25px;
    }
`;

export default MessageInput;
