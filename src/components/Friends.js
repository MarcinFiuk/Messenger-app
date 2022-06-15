import styled from 'styled-components';
import Friend from './Friend';

function Friends({ users, getConversationPartner, activeUser }) {
    const friendsToDisplay = users.map((user, index) => {
        if (user.name.toLowerCase() === activeUser.toLowerCase()) {
            return;
        }
        const { id } = user;
        return (
            <Friend
                friend={user}
                index={index}
                key={id}
                onClick={() => getConversationPartner(user.name)}
            />
        );
    });

    return <FriendsContainer>{friendsToDisplay}</FriendsContainer>;
}

const FriendsContainer = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

export default Friends;
