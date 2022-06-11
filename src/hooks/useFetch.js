import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './../firebase';

const useFetchData = (collectionName) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const colRef = collection(db, collectionName);

        const fetchData = async () => {
            const arrWithSpecialists = [];

            const querySnapshot = await getDocs(colRef);

            querySnapshot.forEach((doc) => {
                const singleElement = { ...doc.data(), id: doc.id };
                arrWithSpecialists.push(singleElement);
            });

            setData(arrWithSpecialists);
        };

        fetchData();
    }, []);

    return data;
};

export default useFetchData;
