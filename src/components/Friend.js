import styled from 'styled-components';

function Friend({ friend, onClick }) {
    return (
        <Button onClick={onClick}>
            <ImgWrapper>
                <img src={friend.photo} alt='user' />
            </ImgWrapper>
            <Paragraph>{friend.name}</Paragraph>
        </Button>
    );
}

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0;
    border: none;
    cursor: pointer;
    background-color: #f1f1f1;

    @media (min-width: 900px) {
        justify-content: space-between;
    }

    &:hover {
    }
`;

const ImgWrapper = styled.div`
    width: 100px;
    height: 100px;
    overflow: hidden;
    border-radius: 100%;
    border: 2px solid #000;

    img {
        width: 100%;
        height: 100%;
    }
`;

const Paragraph = styled.p`
    display: none;

    @media (min-width: 900px) {
        display: block;
        font-family: 'Roboto';
        font-size: clamp(1rem, -2.5rem + 6.25vw, 2.5rem);
    }
`;

export default Friend;
