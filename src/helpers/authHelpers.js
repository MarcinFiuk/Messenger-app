export const getUserNameFromEmail = (email) => {
    const atIndex = email.indexOf('@');
    const userName = email.slice(0, atIndex);
    const capitalizedName = userName[0].toUpperCase() + userName.slice(1);

    return capitalizedName;
};
