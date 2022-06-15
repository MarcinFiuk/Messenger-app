export const getQuerySearch = (user, partner) => {
    if (user && partner) {
        return (user + partner).toLowerCase();
    }
};
